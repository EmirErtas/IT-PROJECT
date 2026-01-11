import { useDroppable } from '@/hooks/use-dnd' // We will create a simple internal hook or just simulate it here. 
// Actually simpler: standard HTML5 events in the component itself.

import { Task, TaskStatus } from './KanbanBoard'
import KanbanCard from './KanbanCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
    onDrop: (taskId: string, status: TaskStatus) => void
}

export default function KanbanColumn({ title, status, tasks, onDrop }: KanbanColumnProps) {

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData("text/plain")
        onDrop(taskId, status)
    }

    return (
        <div
            className="flex flex-col w-80 shrink-0"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-lg">{title}</h3>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {tasks.length}
                </span>
            </div>

            <div className={cn(
                "flex-1 rounded-lg border bg-muted/50 p-3 space-y-3 transition-colors",
                // We could add active drag styling here if we tracked drag state
            )}>
                {tasks.map((task) => (
                    <KanbanCard key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                        Drop items here
                    </div>
                )}
            </div>
        </div>
    )
}
