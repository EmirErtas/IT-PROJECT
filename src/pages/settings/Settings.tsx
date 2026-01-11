import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Bell, Moon, Sun, Monitor, Shield, Laptop } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useTheme } from '@/components/theme-provider'

// Mock Switch Component since we don't have shadcn ui switch yet
function MockSwitch({ id, checked, onCheckedChange }: { id: string, checked?: boolean, onCheckedChange?: (checked: boolean) => void }) {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange && onCheckedChange(!checked)}
            className={`
                peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
                ${checked ? 'bg-primary' : 'bg-input'}
            `}
        >
            <span
                className={`
                    pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform 
                    ${checked ? 'translate-x-5' : 'translate-x-0'}
                `}
            />
        </button>
    )
}


export default function Settings() {
    const { toast } = useToast()
    const { setTheme } = useTheme()
    const [notifications, setNotifications] = useState({ email: true, push: false })
    const [dataSharing, setDataSharing] = useState(true)

    const handleToggle = (key: string, value: boolean) => {
        if (key === 'email' || key === 'push') {
            setNotifications(prev => ({ ...prev, [key]: value }))
        } else if (key === 'dataSharing') {
            setDataSharing(value)
        }
        toast('Settings updated successfully', 'success')
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your application preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-primary" />
                            <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>Customize how FocusFlow looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="theme-mode">Theme Preference</Label>
                                <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                            </div>
                            <div className="flex items-center bg-secondary rounded-lg p-1">
                                <Button variant="ghost" size="sm" className="h-8 rounded-md" onClick={() => setTheme("light")}>
                                    <Sun className="h-4 w-4 mr-2" /> Light
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 rounded-md" onClick={() => setTheme("dark")}>
                                    <Moon className="h-4 w-4 mr-2" /> Dark
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 rounded-md" onClick={() => setTheme("system")}>
                                    <Laptop className="h-4 w-4 mr-2" /> System
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>Configure how you want to be notified.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive daily digests and important updates.</p>
                            </div>
                            <MockSwitch
                                id="email-notifications"
                                checked={notifications.email}
                                onCheckedChange={(checked) => handleToggle('email', checked)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="push-notifications">Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive real-time alerts for tasks and messages.</p>
                            </div>
                            <MockSwitch
                                id="push-notifications"
                                checked={notifications.push}
                                onCheckedChange={(checked) => handleToggle('push', checked)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy & Security */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <CardTitle>Privacy & Security</CardTitle>
                        </div>
                        <CardDescription>Manage your data and security preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label htmlFor="data-sharing">Share Usage Data</Label>
                                <p className="text-sm text-muted-foreground">Help us improve FocusFlow by sharing anonymous usage data.</p>
                            </div>
                            <MockSwitch
                                id="data-sharing"
                                checked={dataSharing}
                                onCheckedChange={(checked) => handleToggle('dataSharing', checked)}
                            />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button variant="outline" className="text-destructive hover:bg-destructive/10">Delete Account</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
