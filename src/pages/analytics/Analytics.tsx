import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, TrendingUp, AlertCircle, Clock } from 'lucide-react'

// Simple CSS Bar Chart Component
function BarChart({ data }: { data: { label: string; value: number }[] }) {
    const maxValue = Math.max(...data.map(d => d.value))

    return (
        <div className="flex items-end justify-between h-48 gap-2 mt-4">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full group">
                    <div
                        className="w-full bg-primary/20 rounded-t-sm relative transition-all group-hover:bg-primary/40"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                    >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm border transition-opacity">
                            {item.value}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-primary/20 h-full w-full rounded-t-sm" style={{ height: '100% !important' }} />
                        {/* Simple filled bar */}
                        <div className="h-full w-full bg-primary rounded-t-sm opacity-90" />
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 truncate w-full text-center">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default function Analytics() {
    const weeklyData = [
        { label: 'Mon', value: 12 },
        { label: 'Tue', value: 19 },
        { label: 'Wed', value: 15 },
        { label: 'Thu', value: 22 },
        { label: 'Fri', value: 28 },
        { label: 'Sat', value: 10 },
        { label: 'Sun', value: 8 },
    ]

    const projectDistribution = [
        { name: 'Website', color: 'bg-blue-500', width: '40%' },
        { name: 'Mobile App', color: 'bg-green-500', width: '35%' },
        { name: 'Marketing', color: 'bg-purple-500', width: '25%' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <p className="text-muted-foreground">Insights into your productivity and task completion.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Task Completion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">+5% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Task Time</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45m</div>
                        <p className="text-xs text-muted-foreground">-2m vs average</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Closed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">114</div>
                        <p className="text-xs text-muted-foreground">Total all time</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Weekly Task Completion</CardTitle>
                        <CardDescription>Number of tasks completed per day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BarChart data={weeklyData} />
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Project Distribution</CardTitle>
                        <CardDescription>Time spent across different projects.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-full">
                        <div className="space-y-6 mt-4">
                            {/* Simulated Pie/Bar Distribution */}
                            <div className="h-6 w-full flex rounded-full overflow-hidden">
                                {projectDistribution.map(p => (
                                    <div key={p.name} className={`${p.color} h-full`} style={{ width: p.width }} title={p.name} />
                                ))}
                            </div>

                            <div className="space-y-4">
                                {projectDistribution.map(p => (
                                    <div key={p.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-3 w-3 rounded-full ${p.color}`} />
                                            <span className="text-sm font-medium">{p.name}</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{p.width}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
