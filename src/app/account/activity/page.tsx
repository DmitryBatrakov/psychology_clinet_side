"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionCompleted } from "@/features/session/ui/SessionCompleted";
import { SessionUpcoming } from "@/features/session/ui/SessionUpcoming";

const TAB  = {
    PAYMENTS: "payments",
    SESSIONS: "sessions",
} as const;

export default function ActivityPage() {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-6">
            <Tabs defaultValue={TAB.SESSIONS} className="w-full max-w-4xl">
                <TabsList variant="line" className="w-full">
                    <TabsTrigger value={TAB.PAYMENTS} className="flex-1">
                        Session Completed
                    </TabsTrigger>
                    <TabsTrigger value={TAB.SESSIONS} className="flex-1">
                        Session Upcoming
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={TAB.PAYMENTS} className="mt-8">
                    <SessionCompleted />
                </TabsContent>

                <TabsContent value={TAB.SESSIONS} className="mt-8">
                    <SessionUpcoming />
                </TabsContent>
            </Tabs>
        </div>
    );
}
