import { Card } from "@/components/ui/card";
import { SpecialistDTO } from "../model/types";
import { SpecialistBio } from "./SpecialistBio";
import { SpecialistBooking } from "./SpecialistBooking";
import { Separator } from "@/components/ui/separator";

export const SpecialistOverviewCard = ({specialist}: {specialist: SpecialistDTO}) => {
    return (
        <Card className="overflow-hidden w-full min-h-[70vh] p-6">
            <SpecialistBio specialist={specialist} />
            <Separator />
            <SpecialistBooking />
        </Card>
    );
};
