"use client";

import { useTherapyData } from "@/features/therapy/hooks/useTherapyData";
import { TherapyOverview } from "@/features/therapy/ui/user-therapy-overview/TherapyOverview";

export default function Therapy() {
    const therapyData = useTherapyData();

    // Проверка загрузки
    if (
        therapyData.dbUser.isPending ||
        therapyData.specialist.isPending ||
        therapyData.session.isPending
    ) {
        return <div>Loading...</div>;
    }

    // Проверка ошибок
    if (
        therapyData.dbUser.isError ||
        therapyData.specialist.isError ||
        therapyData.session.isError
    ) {
        return <div>Error loading data</div>;
    }

    // Проверка только критичных данных (user обязателен)
    if (!therapyData.dbUser.data) {
        return <div>User data not found</div>;
    }


    console.log("therapyData", therapyData);

    return (
        <div className="flex flex-col gap-5 ">
            <TherapyOverview
                userData={therapyData.dbUser}
                specialistData={therapyData.specialist}
            />
        </div>
    );
}
