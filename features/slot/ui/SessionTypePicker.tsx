import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SessionType } from "@/features/specialist/model/types";

export const SessionTypePicker = ({
    sessionType,
}: {
    sessionType: SessionType[];
}) => {
    console.log("sessionType", sessionType);

    return (
        <div className="flex items-center justify-center">
            <FieldSet className="w-full max-w-xs">
                <FieldLegend variant="label">
                    בחרו סוג שיחה
                </FieldLegend>
                <RadioGroup defaultValue={sessionType[0]}>
                    {sessionType.map((type) => (
                        <Field key={type} className="" orientation="horizontal">
                            <RadioGroupItem id={type} value={type} />
                            <FieldLabel htmlFor={type}>{type}</FieldLabel>
                        </Field>
                    ))}
                </RadioGroup>
            </FieldSet>
        </div>
    );
};
