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

export default function ActivityPage() {
    const { user, loading: authLoading } = useAtomValue(authAtom);

    const sessionData = useUserSession(user?.uid ?? null, authLoading);
    const past = sessionData.data?.past ?? [];
    const upcoming = sessionData.data?.upcoming ?? [];

    const specialistIds = useMemo(() => {
        return [...new Set([...past, ...upcoming].map((s) => s.specialistId))];
    }, [past, upcoming]);
    const specialistsData = useUserSpecialists(
        user?.uid ?? null,
        authLoading,
        specialistIds,
    );

    const specialistsMap = useMemo(() => {
        const list = specialistsData.data ?? [];
        return new Map<string, SpecialistDTO>(list.map((s) => [s.id, s]));
    }, [specialistsData.data]);

    // const isSpecialistsInitialLoading =
    //     specialistIds.length > 0 && specialistsData.isLoading;

    // if (sessionData.isLoading || isSpecialistsInitialLoading) {
    //     return <div>טוען...</div>;
    // }

    if (sessionData.isLoading) {
        return <div>טוען...</div>;
    }

    if (sessionData.isError || specialistsData.isError) {
        return <div>שגיאה בטעינת הנתונים</div>;
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-6">
            <Tabs defaultValue={TAB.SESSIONS} className="w-full max-w-4xl">
                <TabsList variant="line" className="w-full">
                    <TabsTrigger value={TAB.PAYMENTS} className="flex-1">
                        פגישות שהסתיימו
                    </TabsTrigger>
                    <TabsTrigger value={TAB.SESSIONS} className="flex-1">
                        פגישות קרובות
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value={TAB.PAYMENTS}
                    className="mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto"
                >
                    <SessionCompleted
                        sessionList={past}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>

                <TabsContent
                    value={TAB.SESSIONS}
                    className="mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto"
                >
                    <SessionUpcoming
                        sessionList={upcoming}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
