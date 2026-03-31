"use client";

import { useUpcomingSession } from "@/features/session/hooks/useUpcomigSession";
import { useTherapyData } from "@/features/therapy/hooks/useTherapyData";
import { TherapistFaq } from "@/features/therapy/ui/therapy-faq/TherapistFaq";
import { TherapyOverview } from "@/features/therapy/ui/user-therapy-overview/TherapyOverview";

export default function Therapy() {
    const therapyData = useTherapyData();
    const upcomingSessionData = useUpcomingSession(therapyData.uid, therapyData.authLoading);
 

    if (
        therapyData.dbUser.isPending ||
        therapyData.specialist.isPending ||
        therapyData.session.isPending
    ) {
        return <div>טוען...</div>;
    }

    if (
        therapyData.dbUser.isError ||
        therapyData.specialist.isError 
        // || therapyData.session.isError
    ) {
        return <div>שגיאה בטעינת הנתונים</div>;
    }


    if (!therapyData.dbUser.data) {
        return <div>נתוני המשתמש לא נמצאו</div>;
    }


    console.log("therapyData", therapyData);

    return (
        <div className="flex flex-col gap-10 ">
            <TherapyOverview
                userData={therapyData.dbUser}
                specialistData={therapyData.specialist}
                // upcomingSessionData={upcomingSessionData}
            />
            <TherapistFaq />
        </div>
    );
}
