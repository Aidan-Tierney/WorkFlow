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