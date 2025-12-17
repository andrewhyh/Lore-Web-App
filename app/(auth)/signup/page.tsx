'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            })

            if (error) {
                throw error
            }

            // Check for email confirmation setting? 
            // Usually Supabase requires email confirmation by default.
            setError('Check your email for a confirmation link.')
            // Or if auto-confirm is on, redirect. But typically better to show message.
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
            <Card className="border-border/50 shadow-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                        Create an account
                    </CardTitle>
                    <CardDescription>
                        Start preserving your family legacy today
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="bg-background/50"
                            />
                        </div>
                        {error && (
                            <div className={`text-sm font-medium ${error.includes('Check your email') ? 'text-primary' : 'text-destructive'}`}>
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full transition-all active:scale-95"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 px-6 py-4">
                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
