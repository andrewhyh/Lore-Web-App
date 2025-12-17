'use client'

import { motion } from 'framer-motion'

export default function DashboardPage() {
    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your Lore digital archive. This works!
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                        <div className="font-semibold">Recent Memories</div>
                        <div className="mt-2 text-sm text-muted-foreground">No memories found. Start adding photos.</div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
