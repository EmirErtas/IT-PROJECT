import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'

const initialNotes = [
    { id: 1, title: 'Meeting Notes', content: 'Discuss Q1 goals and marketing strategy.', color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { id: 2, title: 'Grocery List', content: '- Milk\n- Eggs\n- Bread\n- Coffee', color: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 3, title: 'Project Ideas', content: 'FocusFlow: A new way to manage productivity. Needs a cool logo.', color: 'bg-green-100 dark:bg-green-900/30' },
]

export default function Notes() {
    const [notes, setNotes] = useState(initialNotes)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
                    <p className="text-muted-foreground">Capture your ideas and to-dos.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Note
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notes.map(note => (
                    <Card key={note.id} className={`hover:shadow-md transition-all ${note.color} border-none`}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10">
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-red-500/20 text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="whitespace-pre-wrap text-sm">{note.content}</div>
                        </CardContent>
                    </Card>
                ))}

                {/* Create New Note Card */}
                <button className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-muted-foreground/25 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
                    <div className="h-12 w-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="mt-2 font-medium text-muted-foreground group-hover:text-primary">Create New Note</span>
                </button>
            </div>
        </div>
    )
}
