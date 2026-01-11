import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
    LayoutDashboard,
    KanbanSquare,
    Timer,
    FolderKanban,
    BarChart3,
    CalendarDays,
    StickyNote,
    Settings,
    User,
    LogOut,
    PlusSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: KanbanSquare, label: 'Kanban Board', path: '/kanban' },
    { icon: Timer, label: 'Pomodoro', path: '/pomodoro' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: CalendarDays, label: 'Calendar', path: '/calendar' },
    { icon: StickyNote, label: 'Notes', path: '/notes' },
]

const bottomItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const { signOut } = useAuth()
    const location = useLocation()

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        FocusFlow
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <div className="mb-4">
                        <Button className="w-full justify-start gap-2" variant="default" size="sm">
                            <PlusSquare className="h-4 w-4" />
                            New Task
                        </Button>
                    </div>

                    <div className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Menu
                        </p>
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                    location.pathname === item.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 space-y-1">
                        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            System
                        </p>
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                    location.pathname === item.path
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                        onClick={signOut}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-muted/10">
                <div className="container mx-auto p-6 md:p-8 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
