"use client";

import Widget from "@/components/blocks/widgets/widget";
import { ScheduleDay } from "@/features/schedule-day/ui/ScheduleDay";

export default function Dashboard() {
    return (
        <div className="flex-1 p-3 h-full">
            <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full w-full">
                <Widget className="row-span-2 col-start-3 row-start-2 p-5 shadow-[inset_0_0_10px_0] shadow-black/10 overflow-hidden rounded-lg">
                    <Widget.Content className="custom-scrollbar overflow-y-auto h-full">
                        <ScheduleDay />
                    </Widget.Content>
                </Widget>
                <div />
            </div>
        </div>
    );
}
