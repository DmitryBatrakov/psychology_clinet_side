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

    // if (sessionData.isLoading) {
    //     return <ActivitySkeleton />; 
    // }

    if (sessionData.isError || specialistsData.isError) {
        return <div>שגיאה בטעינת הנתונים</div>;
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-6 px-2 sm:px-4">
            <Tabs defaultValue={TAB.SESSIONS} className="w-full max-w-4xl">
                <TabsList variant="line" className="w-full">
                    <TabsTrigger value={TAB.PAYMENTS} className="flex-1 py-2.5 text-sm sm:text-base">
                        פגישות שהסתיימו
                    </TabsTrigger>
                    <TabsTrigger value={TAB.SESSIONS} className="flex-1 py-2.5 text-sm sm:text-base">
                        פגישות קרובות
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value={TAB.PAYMENTS}
                    className="mt-6 sm:mt-8"
                >
                    <SessionCompleted
                        sessionList={past}
                        specialistsMap={specialistsMap}
                    />
                </TabsContent>

                <TabsContent
                    value={TAB.SESSIONS}
                    className="mt-6 sm:mt-8"
                >
                    <SessionUpcoming
                        sessionList={upcoming}
                        specialistsMap={specialistsMap}
                        isLoading={sessionData.isLoading || specialistsData.isLoading}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}

function ActivitySkeleton() {
    return (
        <div className="flex flex-col justify-start items-center w-full min-h-[calc(100vh-5rem)] max-w-4xl mx-auto">
            <div className="w-full max-w-3xl">
                <div className="grid w-full gap-5 grid-cols-1 md:grid-cols-2 min-h-60">
                    <div className="rounded-md bg-gray-200 min-w-20 flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
                    <div className="rounded-md bg-gray-200 min-w-20 flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
                    <div className="col-span-2 rounded-md bg-gray-200  h-80 w-full flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
