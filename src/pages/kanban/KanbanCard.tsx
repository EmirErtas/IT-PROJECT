import { Task } from './KanbanBoard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' // We need to create Badge
import { CalendarClock } from 'lucide-react'

interface KanbanCardProps {
    task: Task
}

const priorityColor = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

export default function KanbanCard({ task }: KanbanCardProps) {

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("text/plain", task.id)
        e.dataTransfer.effectAllowed = "move"
        // Optional: add a ghost image
    }

    return (
        <Card
            draggable
            onDragStart={handleDragStart}
            className="cursor-move hover:shadow-md transition-shadow active:cursor-grabbing"
        >
            <CardHeader className="p-4 pb-2 space-y-0">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-sm font-medium leading-tight">
                        {task.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between mt-2">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${priorityColor[task.priority]}`}>
                        {task.priority}
                    </span>
                    {task.dueDate && (
                        <div className="flex items-center text-muted-foreground text-xs">
                            <CalendarClock className="w-3 h-3 mr-1" />
                            {task.dueDate}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
