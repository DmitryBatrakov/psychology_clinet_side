import { ScheduleDay } from "@/features/dashboard/ui/ScheduleDay";
import { NextSession } from "@/features/dashboard/ui/NextSession";
import { GreetingSection } from "@/features/dashboard/ui/Greetings";
import { QuickActions } from "@/features/dashboard/ui/QuickActions";

export default function Dashboard() {
    return (
        <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
            <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full flex-1 min-h-0">
                <GreetingSection className="col-span-2 row-span-2 bg-white" />
                <NextSession className="col-start-3 row-start-1 shadow-[0_0_10px_0] shadow-black/5 min-h-0! bg-white" />
                <ScheduleDay className="col-start-3 row-start-2 row-span-2 shadow-[0_0_10px_0] shadow-black/5 min-h-0! bg-white" />
                <QuickActions className="row-start-3 col-span-2 min-h-0! bg-white" />
            </div>
        </div>
    );
}
