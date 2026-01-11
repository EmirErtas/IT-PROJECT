import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export default function Notes() {
    const { session } = useAuth()
    const { toast } = useToast()
    const [notes, setNotes] = useState<any[]>([])
    const [isAddNoteOpen, setAddNoteOpen] = useState(false)
    const [editingNote, setEditingNote] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        fetchNotes()
    }, [session])

    const fetchNotes = async () => {
        if (!session?.user.id) return
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', session.user.id)

        if (error) console.error('Error fetching notes:', error)
        else setNotes(data || [])
    }

    const handleSaveNote = async () => {
        if (!title.trim() || !session?.user.id) return

        if (editingNote) {
            // Update existing note
            const { error } = await supabase
                .from('notes')
                .update({ title, content })
                .eq('id', editingNote.id)

            if (error) {
                console.error('Error updating note:', error)
                toast(`Failed to update note: ${error.message}`, 'error')
            } else {
                setNotes(notes.map(n => n.id === editingNote.id ? { ...n, title, content } : n))
                closeModal()
                toast('Note updated successfully', 'success')
            }
        } else {
            // Create new note
            const newNote = {
                title,
                content,
                color: 'bg-yellow-100', // Default color
                user_id: session.user.id
            }

            const { data, error } = await supabase
                .from('notes')
                .insert([newNote])
                .select()

            if (error) {
                console.error('Error creating note:', error)
                toast(`Failed to create note: ${error.message || error.details || 'Unknown error'}`, 'error')
            } else {
                setNotes([...notes, data[0]])
                closeModal()
                toast('Note created successfully', 'success')
            }
        }
    }

    const handleDeleteNote = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click if any
        if (!confirm('Are you sure you want to delete this note?')) return

        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting note:', error)
            toast(`Failed to delete note: ${error.message}`, 'error')
        } else {
            setNotes(notes.filter(n => n.id !== id))
            toast('Note deleted successfully', 'success')
        }
    }

    const openEditModal = (note: any) => {
        setEditingNote(note)
        setTitle(note.title)
        setContent(note.content)
        setAddNoteOpen(true)
    }

    const closeModal = () => {
        setEditingNote(null)
        setTitle('')
        setContent('')
        setAddNoteOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notes</h2>
                    <p className="text-muted-foreground">Capture your ideas and to-dos.</p>
                </div>

                <Button onClick={() => setAddNoteOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> New Note
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notes.map(note => (
                    <Card key={note.id} className={`hover:shadow-md transition-all ${note.color} border-none`}>
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-black/10 dark:hover:bg-white/10"
                                    onClick={() => openEditModal(note)}
                                >
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-red-500/20 text-destructive"
                                    onClick={(e) => handleDeleteNote(note.id, e)}
                                >
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
                <button
                    className="flex flex-col items-center justify-center h-full min-h-[200px] border-2 border-dashed border-muted-foreground/25 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                    onClick={() => setAddNoteOpen(true)}
                >
                    <div className="h-12 w-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="mt-2 font-medium text-muted-foreground group-hover:text-primary">Create New Note</span>
                </button>
            </div>

            <Modal isOpen={isAddNoteOpen} onClose={closeModal} title={editingNote ? "Edit Note" : "New Note"}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="note-title">Title</Label>
                        <Input
                            id="note-title"
                            placeholder="Note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note-content">Content</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Note content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={closeModal}>Cancel</Button>
                        <Button onClick={handleSaveNote}>{editingNote ? "Save Changes" : "Create Note"}</Button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}
