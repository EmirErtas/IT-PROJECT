import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, CheckSquare, MoreHorizontal, User } from 'lucide-react'

export default function ProjectDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Mock Data Fetch based on ID
    const project = {
        id,
        name: 'Website Redesign',
        description: 'Revamp the corporate website with new branding.',
        dueDate: 'Feb 28, 2024',
        members: 4,
        tasks: [
            { id: '1', title: 'Design Homepage Mockups', status: 'Done' },
            { id: '2', title: 'Implement Responsive Navigation', status: 'In Progress' },
            { id: '3', title: 'Setup CMS Content Types', status: 'Todo' },
            { id: '4', title: 'Write About Us Copy', status: 'Todo' },
        ]
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    {/* Tasks Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Tasks</CardTitle>
                            <Button size="sm">Add Task</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {project.tasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-4 w-4 rounded-full border-2 ${task.status === 'Done' ? 'bg-primary border-primary' : 'border-muted-foreground'}`} />
                                            <span className={task.status === 'Done' ? 'line-through text-muted-foreground' : ''}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                                                {task.status}
                                            </span>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Sidebar Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Project Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Due: {project.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{project.members} Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">2/10 Tasks Completed</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
