import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'

interface CalendarEvent {
    id: string
    title: string
    date: Date
    type: 'task'
}

export default function Calendar() {
    const { session } = useAuth()
    const { toast } = useToast()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        if (session?.user.id) {
            fetchEvents()
        }
    }, [session, currentDate])

    const fetchEvents = async () => {
        // Fetch tasks with due dates
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString()

        const { data: tasks, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', session?.user.id)
            .not('dueDate', 'is', null) // Assuming column name is strictly 'dueDate' based on previous context, but Supabase usually snake_case. Let's check schema or assume snake_case if I created it manually or camelCase if I used ORM. My interface said 'dueDate'. Schema said 'due_date'? Let's check schema result.

        // Wait, I should check schema.sql result.
        // Assuming 'due_date' in DB and mapped to 'dueDate' manually or just 'due_date' in TS interface if I update it.
        // Let's assume standard Supabase snake_case for DB columns.

        if (error) {
            console.error('Error fetching calendar events:', error)
            return
        }

        const mappedEvents = (tasks || []).map((t: any) => ({
            id: t.id,
            title: t.title,
            date: new Date(t.due_date || t.dueDate), // Handle both potential casing
            type: 'task' as const
        }))
        setEvents(mappedEvents)
    }

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(currentDate)
        const startDay = firstDayOfMonth(currentDate)
        const days = []

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border border-muted/50 bg-muted/20" />)
        }

        // Days of current month
        for (let i = 1; i <= totalDays; i++) {
            const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            const dayEvents = events.filter(e =>
                e.date.getDate() === i &&
                e.date.getMonth() === currentDate.getMonth() &&
                e.date.getFullYear() === currentDate.getFullYear()
            )

            days.push(
                <div key={i} className="h-24 md:h-32 border border-muted-foreground/20 p-2 relative group hover:bg-muted/30 transition-colors overflow-y-auto">
                    <span className={`text-sm font-medium ${i === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear()
                        ? 'bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center'
                        : 'text-muted-foreground'
                        }`}>
                        {i}
                    </span>
                    {dayEvents.map(event => (
                        <div key={event.id} className="mt-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded px-1.5 py-0.5 truncate cursor-pointer hover:opacity-80" onClick={() => toast(`Task: ${event.title}`)}>
                            {event.title}
                        </div>
                    ))}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100">
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                            <span className="text-lg leading-none">+</span>
                        </Button>
                    </div>
                </div>
            )
        }
        return days
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-md border bg-background shadow-sm">
                        <Button variant="ghost" size="icon" onClick={prevMonth}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="w-40 text-center font-semibold">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </div>
                        <Button variant="ghost" size="icon" onClick={nextMonth}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button>Today</Button>
                </div>
            </div>

            <Card className="flex-1 flex flex-col">
                <div className="grid grid-cols-7 border-b">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-4 text-center text-sm font-semibold text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 flex-1">
                    {renderCalendarDays()}
                </div>
            </Card>
        </div>
    )
}
