import { SessionTypePicker } from "@/features/slot/ui/SessionTypePicker";
import { SpecialistDTO } from "../model/types";
import { SessionDatePicker } from "@/features/slot/ui/SessionDatePicker";
import { useParams } from "next/navigation";
import { useSpecialistById } from "../hooks/useSpecialistById";

export const SpecialistBooking = ({}: {}) => {
    const params = useParams<{ id: string | string[] }>();
    const specialistId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const specialistQuery = useSpecialistById(specialistId);

    if (specialistQuery.isPending) return <div>Loading...</div>;
    if (specialistQuery.isError)
        return <div>Error: {specialistQuery.error.message}</div>;

    if (!specialistQuery.data) return <div>Error loading</div>;

    return (
        <div className="flex flex-col w-full p-2">
            {/* <p>Specialist Booking {specialist.firstName} {specialist.lastName}</p> */}
            <div className="flex items-center justify-around">
                <div className="text-sm text-muted-foreground">
                    <SessionTypePicker
                        sessionType={specialistQuery.data.sessionTypes}
                    />
                </div>
                <div className="text-sm text-muted-foreground">
                    <SessionDatePicker />
                </div>
            </div>
        </div>
    );
};
