import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>('work')
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            setIsActive(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            // Play sound here
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isActive, timeLeft])

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        if (mode === 'work') setTimeLeft(25 * 60)
        if (mode === 'short-break') setTimeLeft(5 * 60)
        if (mode === 'long-break') setTimeLeft(15 * 60)
    }

    const setTimerMode = (newMode: 'work' | 'short-break' | 'long-break') => {
        setMode(newMode)
        setIsActive(false)
        if (newMode === 'work') setTimeLeft(25 * 60)
        if (newMode === 'short-break') setTimeLeft(5 * 60)
        if (newMode === 'long-break') setTimeLeft(15 * 60)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const progress = mode === 'work'
        ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
        : mode === 'short-break'
            ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
            : ((15 * 60 - timeLeft) / (15 * 60)) * 100

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-10">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Focus Timer</h2>
                <p className="text-muted-foreground">Stay focused and take breaks.</p>
            </div>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex justify-center gap-2 mb-4">
                        <Button
                            variant={mode === 'work' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTimerMode('work')}
                            className="gap-2"
                        >
                            <Brain className="h-4 w-4" /> Work
                        </Button>
                        <Button
                            variant={mode === 'short-break' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTimerMode('short-break')}
                            className="gap-2"
                        >
                            <Coffee className="h-4 w-4" /> Short Break
                        </Button>
                        <Button
                            variant={mode === 'long-break' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTimerMode('long-break')}
                        >
                            Long Break
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-8">
                    <div className="relative flex items-center justify-center">
                        {/* Simple SVG Circle Progress */}
                        <div className="relative h-64 w-64">
                            <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 100 100">
                                <circle
                                    className="text-muted stroke-current"
                                    strokeWidth="5"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    className="text-primary stroke-current transition-all duration-1000 ease-linear"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                    strokeDasharray={`${2 * Math.PI * 45}`}
                                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl font-bold font-mono tracking-tighter">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            size="lg"
                            className="w-32"
                            variant={isActive ? "secondary" : "default"}
                            onClick={toggleTimer}
                        >
                            {isActive ? (
                                <>
                                    <Pause className="mr-2 h-4 w-4" /> Pause
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2 h-4 w-4" /> Start
                                </>
                            )}
                        </Button>
                        <Button size="lg" variant="outline" onClick={resetTimer}>
                            <RotateCcw className="mr-2 h-4 w-4" /> Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4/8</div>
                        <p className="text-xs text-muted-foreground">Pomodoros completed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2h 15m</div>
                        <p className="text-xs text-muted-foreground">Today</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5 Days</div>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
