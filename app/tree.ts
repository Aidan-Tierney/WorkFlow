type Position = { column: number; row: number }
export function layoutTasks(allTasks: any[], maxColumns: number = Infinity) {   // CHANGED
  const wrapped: {childId: string; parentId: string; bandRow: number}[]=[]
    const postions = new Map<string, Position>()            // NEW
  const later: any[] = []                                                          // NEW
  let newrow = 0

  function place(task: any, depth: number): number {
    const children = allTasks.filter((t) => t.parent_task_id === task.id)

    // NEW: do the children fit in the next column?
    const fits = depth + 1 < maxColumns
    if (!fits) {
      for (const child of children) {
        later.push(child)                                     // lay it out later, in a new band
        wrapped.push({ childId: child.id, parentId: task.id, bandRow: 0 })
      }
    }
    const inline = fits ? children : []                       // only these get placed here

    let row: number
    if (inline.length === 0) {                                 // CHANGED: children → inline
      row = newrow
      newrow = newrow + 1
    } else {
      const childRows = inline.map((child) => place(child, depth + 1))   // CHANGED
      row = (childRows[0] + childRows[childRows.length - 1]) / 2
    }
    postions.set(task.id, { column: depth, row })
    return row
  }

  const roots = allTasks.filter((t) => !t.parent_task_id)
  for (const root of roots) {
    place(root, 0)
  }

  // NEW: each wrapped branch becomes its own band, below everything so far
  while (later.length > 0) {
    const branchRoot = later.shift()
    newrow = newrow + 1      // one empty row as a gap, where the connector line runs
    const entry = wrapped.find((w) => w.childId === branchRoot.id)
if (entry) entry.bandRow = newrow
    
    place(branchRoot, 0)
  }

  return { positions: postions, wrapped }                     // CHANGED: return both
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

export function buildOutline(tasks: any[]) {
    const aliasToId = new Map<string, string>()
    const lines: string[]=[]
    let counter = 1

    function visit(task: any, depth: number){
        const alias = `e${counter}`
        counter++
        aliasToId.set(alias, task.id)
        lines.push(`${'  '.repeat(depth)}- [${alias}] ${task.task_name}`)

        const children = tasks.filter((t) => t.parent_task_id===task.id)
        for (const child of children) {
            visit(child, depth + 1)
        }
    }
    const roots = tasks.filter((t) => !t.parent_task_id)
    for (const root of roots)visit(root,0)

    return {outline: lines.join('\n'), aliasToId}
}

