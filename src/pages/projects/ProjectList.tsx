import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Folder, MoreHorizontal } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

// Mock Data
export default function ProjectList() {
    const navigate = useNavigate()
    const { session } = useAuth()
    const { toast } = useToast()
    const [projects, setProjects] = useState<any[]>([])
    const [isCreateOpen, setCreateOpen] = useState(false)
    const [newProjectName, setNewProjectName] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [session])

    const fetchProjects = async () => {
        if (!session?.user.id) return
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', session.user.id)

        if (error) console.error('Error fetching projects:', error)
        else setProjects(data || [])
    }

    const handleCreateProject = async () => {
        if (!newProjectName.trim() || !session?.user.id) return

        const newProject = {
            name: newProjectName,
            status: 'active',
            user_id: session.user.id
        }

        const { data, error } = await supabase
            .from('projects')
            .insert([newProject])
            .select()

        if (error) {
            console.error('Error creating project:', error)
            toast('Failed to create project', 'error')
        } else {
            setProjects([...projects, data[0]])
            setNewProjectName('')
            setCreateOpen(false)
            toast('Project created successfully', 'success')
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage and track your projects.</p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="cursor-pointer hover:shadow-md transition-all"
                        onClick={() => navigate(`/projects/${project.id}`)}
                    >
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 rounded-md">
                                    <Folder className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                                    <CardDescription className="line-clamp-1 mt-1">{project.description}</CardDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="-mt-2">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                    {project.status}
                                </span>
                                <span>{project.taskCount} tasks</span>
                            </div>

                            {/* Progress Bar Placeholder */}
                            <div className="mt-4 h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[60%]" />
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Project Card Placeholder */}
                <Button
                    variant="outline"
                    className="h-full min-h-[180px] flex flex-col gap-2 border-dashed border-2 hover:border-primary hover:bg-primary/5"
                    onClick={() => setCreateOpen(true)}
                >
                    <Plus className="h-8 w-8" />
                    <span>Create New Project</span>
                </Button>
            </div>


            <Modal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} title="New Project">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter project name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateProject}>Create Project</Button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
