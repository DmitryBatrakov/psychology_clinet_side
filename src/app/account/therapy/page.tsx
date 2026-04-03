"use client";

import { useTherapyData } from "@/features/therapy/hooks/useTherapyData";
import { TherapistFaq } from "@/features/therapy/ui/therapy-faq/TherapistFaq";
import { TherapyOverview } from "@/features/therapy/ui/user-therapy-overview/TherapyOverview";

export default function Therapy() {
    const therapyData = useTherapyData();

    if (therapyData.dbUser.isLoading || therapyData.upcomingSession.isLoading) {
        return <TherapySceleton />;
    }

    return (
        <div className="flex flex-col gap-10 ">
            <TherapyOverview
                userData={therapyData.dbUser}
                upcomingSessionData={therapyData.upcomingSession}
            />
            <TherapistFaq />
        </div>
    );
}

function TherapySceleton() {
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-5rem)] max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center justify-center gap-10 px-10">
                <div className="rounded-md bg-gray-200  h-50 w-full flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
                <div className="rounded-md bg-gray-200  h-50 w-full flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
                <div className="col-span-2 rounded-md bg-gray-200  h-50 w-full flex flex-col justify-between items-center gap-6 p-4 animate-pulse"></div>
            </div>
        </div>
    );
}
