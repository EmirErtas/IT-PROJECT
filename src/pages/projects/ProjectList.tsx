import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Folder, MoreHorizontal } from 'lucide-react'

// Mock Data
const projects = [
    { id: '1', name: 'Website Redesign', description: 'Revamp the corporate website with new branding.', status: 'Active', taskCount: 12 },
    { id: '2', name: 'Mobile App Beta', description: 'Prepare the mobile app for beta release.', status: 'In Progress', taskCount: 8 },
    { id: '3', name: 'Q1 Marketing Campaign', description: 'Plan and execute Q1 marketing strategy.', status: 'Planning', taskCount: 5 },
]

export default function ProjectList() {
    const navigate = useNavigate()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage and track your projects.</p>
                </div>
                <Button>
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
                    onClick={() => { }}
                >
                    <Plus className="h-8 w-8" />
                    <span>Create New Project</span>
                </Button>
            </div>
        </div>
    )
}
