import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import KanbanColumn from './KanbanColumn'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'

export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
    id: string
    title: string
    status: TaskStatus
    priority: 'low' | 'medium' | 'high'
    dueDate?: string
}

export default function KanbanBoard() {
    const { session } = useAuth()
    const { toast } = useToast()
    const [tasks, setTasks] = useState<Task[]>([])
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState('')

    useEffect(() => {
        fetchTasks()
    }, [session])

    const fetchTasks = async () => {
        if (!session?.user.id) return
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', session.user.id)

        if (error) console.error('Error fetching tasks:', error)
        else setTasks(data as unknown as Task[] || [])
    }

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim() || !session?.user.id) return

        const newTask = {
            title: newTaskTitle,
            status: 'todo',
            priority: 'medium',
            user_id: session.user.id
        }

        const { data, error } = await supabase
            .from('tasks')
            .insert([newTask])
            .select()

        if (error) {
            console.error('Error creating task:', error)
            toast(`Failed to create task: ${error.message || error.details || 'Unknown error'}`, 'error')
        } else {
            setTasks([...tasks, data[0] as unknown as Task])
            setNewTaskTitle('')
            setIsAddTaskModalOpen(false)
            toast('Task created successfully', 'success')
        }
    }

    const handleDrop = async (taskId: string, newStatus: TaskStatus) => {
        // Optimistic update
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        )

        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', taskId)

        if (error) {
            console.error('Error updating task status:', error)
            toast(`Failed to update task status: ${error.message}`, 'error')
            // Revert on error
            fetchTasks()
        }
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


            <Modal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} title="New Task">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input
                            id="title"
                            placeholder="Enter task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddTaskModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateTask}>Create Task</Button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
