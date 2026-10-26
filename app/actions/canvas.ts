//Allows users to sync their canvas creating projects and tasks in the app from canvas
'use server'
import { createClient } from '@/lib/supabase/server'

export async function syncCanvas() {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    if (!data.user) {
        return { error: 'Not logged in' }
    }
    const { data: connection } = await supabase
        .from('canvas')
        .select('canvas_url, canvas_token')
        .maybeSingle()

    if (!connection) {
        return { error: 'Canvas not connected' }
    }
    const response = await fetch(`${connection.canvas_url}/api/v1/courses?per_page=100`, {
        headers: {
            'Authorization': `Bearer ${connection.canvas_token}`
        }
    })
    if (!response.ok) {
        return { error: `Canvas said ${response.status}` }
    }
    const courses = await response.json()
    const rows = courses
        .filter((course: { id: number, name?: string }) => course.name)
        .map((course: { id: number, name: string }) => ({
            project_name: course.name,
            canvas_course_id: course.id,
            user_id: data.user.id
        }))
    const { error: saveError } = await supabase
        .from('projects')
        .upsert(rows, { onConflict: 'user_id,canvas_course_id', ignoreDuplicates: true })
    if (saveError) {
        return { error: `Failed to save projects: ${saveError.message}` }
    }
    const { data: projects } = await supabase
        .from('projects')
        .select('canvas_course_id, id')
        .not('canvas_course_id', 'is', null)
    const projectIdByCourse = new Map()
    for (const project of projects ?? []) {
        projectIdByCourse.set(project.canvas_course_id, project.id)
    }
    const newTasks = []
    const submittedIds = []
    for (const [courseId, projectId] of projectIdByCourse) {
        const assignmentsResponse = await fetch(
            `${connection.canvas_url}/api/v1/courses/${courseId}/assignments?per_page=100&include[]=submission`, {
            headers: {
                'Authorization': `Bearer ${connection.canvas_token}`
            }
        }
        )
        if (!assignmentsResponse.ok) {
            continue
        }
        const assignments = await assignmentsResponse.json()
        for (const assignment of assignments) {
            const submitted = ['submitted', 'graded', 'pending_review'].includes(assignment.submission?.workflow_state)
            if (submitted) {
                submittedIds.push(assignment.id)
            }
            else {
                newTasks.push({
                    task_name: assignment.name,
                    canvas_assignment_id: assignment.id,
                    project_id: projectId,
                    user_id: data.user.id
                })
            }
        }
    }
    const { error: taskError } = await supabase
        .from('tasks')
        .upsert(newTasks, { onConflict: 'user_id,canvas_assignment_id', ignoreDuplicates: true })
        if (taskError) {
            return { error: `Failed to save tasks: ${taskError.message}` }
        }
        const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: true, completed_at: new Date().toISOString()})
        .in('canvas_assignment_id', submittedIds)

        if (updateError) {
            return { error: `Failed to update tasks: ${updateError.message}` }
        }
    return { count: newTasks.length }
}
