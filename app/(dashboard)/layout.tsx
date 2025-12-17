import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="flex h-screen w-full bg-background">
            {/* Sidebar - Desktop */}
            <aside className="hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
                <div className="flex h-14 items-center border-b border-border px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-lg tracking-tight">Lore.</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-4">
                    {/* Navigation Items would go here */}
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground transition-all hover:text-sidebar-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                        >
                            Family Tree
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                        >
                            Timeline
                        </Link>
                    </nav>
                </div>
                <div className="border-t border-border p-4">
                    {/* User Profile / Logout */}
                    <div className="text-xs text-muted-foreground">
                        Logged in as <br />
                        <span className="font-medium text-foreground">{user.email}</span>
                    </div>

                    <form action="/auth/signout" method="post" className="mt-2">
                        <Button variant="outline" size="sm" className="w-full">
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col overflow-auto">
                {children}
            </main>
        </div>
    )
}
