"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionCompleted } from "@/features/session/ui/SessionCompleted";
import { SessionUpcoming } from "@/features/session/ui/SessionUpcoming";
import { useUserSpecialists } from "@/features/specialist/hooks/useUserSpecialist";
import { useMemo } from "react";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";
import { useUserSession } from "@/features/session/hooks/useUserSession";

const TAB = {
    PAYMENTS: "payments",
    SESSIONS: "sessions",
} as const;

const MOCK_UID = "user-1";

export default function ActivityPage() {

    const { user, loading: authLoading } = useAtomValue(authAtom);

    const effectiveUid =  MOCK_UID; // TODO: change to user?.uid ?? null

    const sessionData = useUserSession(effectiveUid, authLoading);  // TODO: change effectiveUid to uid

    const specialistsData = useUserSpecialists(
        effectiveUid,
        authLoading,
    );

    const specialistsMap = useMemo(() => {
        const list = specialistsData.data ?? [];
        return new Map<string, SpecialistDTO>(
            list.map((s) => [s.id, s]),
        );
    }, [specialistsData.data]);

    const sessionList = sessionData.data ?? [];

    if (sessionData.isPending || specialistsData.isPending) {
        return <div>Loading...</div>;
    }
    if (sessionData.isError || specialistsData.isError) {
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
                        sessionList={sessionList}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>

                <TabsContent value={TAB.SESSIONS} className="mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    <SessionUpcoming
                        sessionList={sessionList}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
