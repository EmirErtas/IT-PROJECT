import { useState } from 'react'
import { Plus } from 'lucide-react'
import KanbanColumn from './KanbanColumn'
import { Button } from '@/components/ui/button'

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
    id: string
    title: string
    status: TaskStatus
    priority: 'low' | 'medium' | 'high'
    dueDate?: string
}

const initialTasks: Task[] = [
    { id: '1', title: 'Research competitors', status: 'todo', priority: 'medium' },
    { id: '2', title: 'Design system draft', status: 'todo', priority: 'high', dueDate: '2024-02-10' },
    { id: '3', title: 'Setup Supabase', status: 'in-progress', priority: 'high' },
    { id: '4', title: 'Create login page', status: 'done', priority: 'medium' },
]

export default function KanbanBoard() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

    const handleDrop = (taskId: string, newStatus: TaskStatus) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        )
    }

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kanban</h2>
                    <p className="text-muted-foreground">Manage your tasks by dragging them across columns.</p>
                </div>
                <Button onClick={() => setIsAddTaskModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Task
                </Button>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden">
                <div className="flex h-full gap-6 pb-4">
                    <KanbanColumn
                        title="To Do"
                        status="todo"
                        tasks={tasks.filter((t) => t.status === 'todo')}
                        onDrop={handleDrop}
                    />
                    <KanbanColumn
                        title="In Progress"
                        status="in-progress"
                        tasks={tasks.filter((t) => t.status === 'in-progress')}
                        onDrop={handleDrop}
                    />
                    <KanbanColumn
                        title="Done"
                        status="done"
                        tasks={tasks.filter((t) => t.status === 'done')}
                        onDrop={handleDrop}
                    />
                </div>
            </div>
        </div>
    )
}
