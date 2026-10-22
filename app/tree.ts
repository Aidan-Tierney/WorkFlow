

type Position = { column: number; row: number }
export function layoutTasks(allTasks: any[]){
    const postions = new Map<string, Position>()
    let newrow=0

    function place(task: any, depth: number): number{
        const children = allTasks.filter((t) => t.parent_task_id === task.id)
        let row: number
        if (children.length ===0){
            row=newrow
            newrow=newrow+1

        }
        else {
            const childRows = children.map((child) => place(child,depth+1))
            row =((childRows[0] + childRows[childRows.length -1])/2)
        }
        postions.set(task.id, {column:depth, row})
        return row
    }
    const roots = allTasks.filter((t) => !t.parent_task_id)
    for (const root of roots){
        place(root,0)
    }
    return postions
    
}
export function getDescendantIds(taskId:string, allTasks: any[]): string[]{
    const ids: string[] = []
    const children = allTasks.filter((t) => t.parent_task_id === taskId)
    for (const child of children){
        ids.push(child.id)
        ids.push(...getDescendantIds(child.id,allTasks))
    }
    return ids
}
export function withAncestors(startTasks: any[], allTasks: any[]){
    const byId = new Map()
    for (const t of allTasks) byId.set(t.id, t)
        const keep = new Set<string>()
    for (const t of startTasks){
        let current = t
        while (current){
            keep.add(current.id)
            current = byId.get(current.parent_task_id)
        }
    }
    return allTasks.filter((t) => keep.has(t.id))
}