"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionCompleted } from "@/features/session/ui/SessionCompleted";
import { SessionUpcoming } from "@/features/session/ui/SessionUpcoming";
import { useUserSpecialists } from "@/features/specialist/hooks/useUserSpecialist";
import { useTherapyData } from "@/features/therapy/hooks/useTherapyData";
import { useMemo } from "react";
import type { SpecialistDTO } from "@/features/specialist/model/types";

const TAB = {
    PAYMENTS: "payments",
    SESSIONS: "sessions",
} as const;

const MOCK_UID = "user-1";

export default function ActivityPage() {
    const therapyData = useTherapyData();
    const effectiveUid = MOCK_UID;

    const specialistsQuery = useUserSpecialists(
        effectiveUid,
        therapyData.authLoading,
    );

    const specialistsMap = useMemo(() => {
        const list = specialistsQuery.data ?? [];
        return new Map<string, SpecialistDTO>(
            list.map((s) => [s.id, s]),
        );
    }, [specialistsQuery.data]);

    const sessionData = (therapyData.session.data ?? []).filter(
        (s) => s.userId === effectiveUid,
    );

    if (therapyData.session.isPending || specialistsQuery.isPending) {
        return <div>Loading...</div>;
    }
    if (therapyData.session.isError || specialistsQuery.isError) {
        return <div>Error loading data</div>;
    }

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

                <TabsContent value={TAB.PAYMENTS} className="mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <SessionCompleted
                        sessionData={sessionData}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>

                <TabsContent value={TAB.SESSIONS} className="mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <SessionUpcoming
                        sessionData={sessionData}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
