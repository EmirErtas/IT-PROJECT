import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())

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
            // Mock event on 5th and 15th
            const hasEvent = i === 5 || i === 15 || i === 24
            days.push(
                <div key={i} className="h-24 md:h-32 border border-muted-foreground/20 p-2 relative group hover:bg-muted/30 transition-colors">
                    <span className={`text-sm font-medium ${i === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear()
                        ? 'bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center'
                        : 'text-muted-foreground'
                        }`}>
                        {i}
                    </span>
                    {hasEvent && (
                        <div className="mt-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded px-1.5 py-0.5 truncate">
                            Project Review
                        </div>
                    )}
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
