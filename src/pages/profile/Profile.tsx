import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Camera } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

// Mock Avatar Component since we don't have the shadcn ui avatar yet
function MockAvatar({ fallback }: { fallback: string }) {
    return (
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-2 border-background shadow-sm">
            {fallback}
        </div>
    )
}

export default function Profile() {
    const { user } = useAuth()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState('')

    const handleUpdateProfile = async () => {
        setLoading(true)
        // In a real app we'd update a 'profiles' table or auth metadata
        // For now let's just simulate it or update auth metadata if needed
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user?.id,
                email: user?.email,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            })

            if (error) throw error
            toast('Profile updated successfully', 'success')
        } catch (error) {
            console.error(error)
            toast('Failed to update profile', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div className="space-y-6">
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <div className="relative inline-block">
                                <MockAvatar fallback={user?.email?.charAt(0).toUpperCase() || 'U'} />
                                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold">User Name</h3>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-9"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" value={user?.email || ''} disabled className="pl-9" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleUpdateProfile} disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>Change your password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="outline">Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
