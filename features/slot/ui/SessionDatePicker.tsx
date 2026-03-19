import { scheduleRulesMock } from "@/mockData/slot/scheduleData";
import { WeekdayKey } from "../model/type";

export const SessionDatePicker = () => {
    const scheduleRule = scheduleRulesMock.find(
        (rule) => rule.specialistId === "spec-2",
    );
 
    const weekDays = Object.keys(scheduleRule?.weekdayIntervals ?? {});
    // const dateToday = new Date().toISOString().split('T')[0].split('-').reverse().join('/');
    // const dateToday = new Date().toLocaleDateString('en-CA');
    // const today = new Date();
    // const dateToday = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return (
        <div className="flex flex-col items-start justify-start max-w-2xl overflow-auto p-4 border border-gray-200 rounded-md h-full">
            <div className="flex items-start justify-start h-full gap-5">
                {weekDays
                    .map((day) => (
                        <div
                            key={day}
                            className="flex flex-col items-center justify-center gap-2 "
                        >
                            <div className="flex flex-col items-center justify-center gap-1 border border-gray-200 rounded-md p-2 shadow-md min-w-32">
                                <span>{day}</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                                {scheduleRule?.weekdayIntervals[
                                    day as WeekdayKey
                                ].map((interval) => (
                                    <div
                                        key={interval.startTime}
                                        className="flex items-center justify-center gap-1"
                                    >
                                        <span>{interval.startTime}</span>
                                        <span>{interval.endTime}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
