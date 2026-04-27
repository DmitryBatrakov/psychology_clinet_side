"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationSchema, applicationSchema } from "../validation";
import {
    FieldLabel,
    FieldGroup,
    FieldLegend,
    FieldSet,
    Field,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, languagesList } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
    GENDER_LABELS,
    PROFESSION_LABELS,
    SESSION_TYPE_LABELS,
} from "@/features/specialist/model/specialistLabels";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRef } from "react";
import { SpecialistApplicationCreateInput } from "../model/types";
import { useApplicationsSpecialist } from "../hooks/useApplicationsSpecialist";
import { useUploadDocuments } from "../hooks/useUploadDocuments";
import { Profession } from "@/features/specialist/model/types";
import { Gender } from "@/features/user/model/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { he } from "date-fns/locale";
import { toDateKey } from "@/lib/func/to-date-key/toDateKey";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

export const FormApplication = () => {
    const basicDegreeRef = useRef<HTMLInputElement>(null);
    const advancedDegreeRef = useRef<HTMLInputElement>(null);

    const { mutate: fetchApplSpecialistMutation, isPending } =
        useApplicationsSpecialist();
    const { uploadDocuments } = useUploadDocuments();

    const form = useForm<ApplicationSchema>({
        resolver: zodResolver(applicationSchema),
        mode: "onSubmit",
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            passportId: "",
            languages: [],
            birthDate: "",
            gender: "",
            profession: "",
            sessionTypes: [],
            experience: "",
            pricePerSession: "",
            hoursPerWeek: "",
            basicDegree: [],
            advancedDegree: [],
            agree: false,
        },
    });

    const onSubmit = async (data: ApplicationSchema) => {
        try {
            const basicDegreeUrls = await uploadDocuments(data.basicDegree);

            const advancedDegreeUrls =
                data.advancedDegree && data.advancedDegree.length > 0
                    ? await uploadDocuments(data.advancedDegree)
                    : undefined;

            const payload: SpecialistApplicationCreateInput = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                passportId: data.passportId,
                languages: data.languages,
                birthDate: data.birthDate,
                gender: data.gender as Gender,
                profession: data.profession as Profession,
                sessionTypes: data.sessionTypes,
                experience: data.experience,
                pricePerSession: data.pricePerSession,
                hoursPerWeek: data.hoursPerWeek,
                basicDegreeUrls,
                advancedDegreeUrls,
                agree: data.agree,
            };

            fetchApplSpecialistMutation(payload, {
                onSuccess: () => {
                    form.reset();
                    if (basicDegreeRef.current) basicDegreeRef.current.value = "";
                    if (advancedDegreeRef.current)
                        advancedDegreeRef.current.value = "";
                    toast.success("הטופס נשלח בהצלחה");
                },
                onError: () => {
                    toast.error("שגיאת רשת — נסו שוב");
                },
            });
        } catch {
            toast.error("שגיאה בהעלאת הקבצים — נסו שוב");
        }
    };

    const isSubmitting = form.formState.isSubmitting || isPending;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-10 items-start justify-center"
                dir="rtl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[1.1rem]">
                                    שם פרטי
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="שם פרטי" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[1.1rem]">
                                    שם משפחה
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="שם משפחה" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[1.1rem]">
                                    מספר טלפון
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="0500000000"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passportId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[1.1rem]">
                                    מספר תעודת זהות
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="000000000"
                                        maxLength={9}
                                        inputMode="numeric"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-[1.1rem]">
                                    תאריך לידה
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(parseISO(field.value), "PPP", { locale: he })
                                                ) : (
                                                    <span>בחר תאריך</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                        dir="rtl"
                                    >
                                        <Calendar
                                            mode="single"
                                            captionLayout="dropdown"
                                            locale={he}
                                            onSelect={(date) =>
                                                field.onChange(
                                                    date ? toDateKey(date) : "",
                                                )
                                            }
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1920-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Separator />
                <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FieldSet className="flex flex-col gap-3">
                                <FieldLegend className="text-[2rem]">
                                    שפות
                                </FieldLegend>
                                <FormMessage />

                                <FieldGroup className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-y-10 w-full md:max-w-lg">
                                    {languagesList.map((language) => {
                                        const isChecked = field.value.includes(
                                            language.id,
                                        );
                                        return (
                                            <Field
                                                key={language.id}
                                                orientation="horizontal"
                                                className="flex md:flex-col gap-2"
                                            >
                                                <Checkbox
                                                    id={language.id}
                                                    checked={isChecked}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        if (checked) {
                                                            field.onChange([
                                                                ...field.value,
                                                                language.id,
                                                            ]);
                                                            return;
                                                        }

                                                        field.onChange(
                                                            field.value.filter(
                                                                (value) =>
                                                                    value !==
                                                                    language.id,
                                                            ),
                                                        );
                                                    }}
                                                />

                                                <FieldLabel
                                                    htmlFor={language.id}
                                                >
                                                    {language.label}
                                                </FieldLabel>
                                            </Field>
                                        );
                                    })}
                                </FieldGroup>
                            </FieldSet>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FieldSet className="w-full">
                                <FieldLegend className="flex items-start justify-start w-full text-[1.5rem]">
                                    מגדר
                                </FieldLegend>
                                <FormMessage />

                                <RadioGroup
                                    orientation="horizontal"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex w-full items-start gap-0 justify-start"
                                >
                                    {Object.entries(GENDER_LABELS).map(
                                        ([value, label]) => (
                                            <FieldGroup
                                                key={value}
                                                className="flex items-center gap-2"
                                            >
                                                <FieldLabel htmlFor={value}>
                                                    {label}
                                                </FieldLabel>
                                                <RadioGroupItem
                                                    value={value}
                                                    id={value}
                                                />
                                            </FieldGroup>
                                        ),
                                    )}
                                </RadioGroup>
                            </FieldSet>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                מקצוע
                            </FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="בחרו מקצוע" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent
                                    side="bottom"
                                    align="start"
                                    position="popper"
                                >
                                    <SelectGroup>
                                        <SelectLabel>מקצוע</SelectLabel>
                                        {Object.entries(PROFESSION_LABELS).map(
                                            ([value, label]) => (
                                                <SelectItem
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sessionTypes"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FieldSet>
                                <FieldLegend className="text-[1.1rem]">
                                    סוגי מפגש
                                </FieldLegend>
                                <FieldGroup>
                                    {Object.entries(SESSION_TYPE_LABELS).map(
                                        ([value, label]) => {
                                            const checked =
                                                field.value.includes(
                                                    value as ApplicationSchema["sessionTypes"][number],
                                                );
                                            return (
                                                <Field
                                                    key={value}
                                                    orientation="horizontal"
                                                >
                                                    <Checkbox
                                                        id={`session-${value}`}
                                                        checked={checked}
                                                        onCheckedChange={(
                                                            nextChecked,
                                                        ) => {
                                                            if (nextChecked) {
                                                                field.onChange([
                                                                    ...field.value,
                                                                    value,
                                                                ]);
                                                                return;
                                                            }
                                                            field.onChange(
                                                                field.value.filter(
                                                                    (item) =>
                                                                        item !==
                                                                        value,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                    <FieldLabel
                                                        htmlFor={`session-${value}`}
                                                    >
                                                        {label}
                                                    </FieldLabel>
                                                </Field>
                                            );
                                        },
                                    )}
                                </FieldGroup>
                            </FieldSet>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                שנות ניסיון
                            </FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(
                                            String(event.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pricePerSession"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                מחיר ממוצע למפגש
                            </FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(
                                            String(event.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hoursPerWeek"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                שעות זמינות בשבוע
                            </FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(
                                            String(event.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="basicDegree"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                תעודה בסיסית (דיפלומה / תואר)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                                    ref={basicDegreeRef}
                                    onChange={(event) =>
                                        onChange(
                                            Array.from(
                                                event.target.files ?? [],
                                            ),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="advancedDegree"
                    render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel className="text-[1.1rem]">
                                תעודות נוספות / סרטיפיקטים (אופציונלי)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    multiple
                                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                                    ref={advancedDegreeRef}
                                    onChange={(event) =>
                                        onChange(
                                            Array.from(
                                                event.target.files ?? [],
                                            ),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                        <FormItem>
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="agree"
                                    checked={field.value}
                                    onCheckedChange={(checked) =>
                                        field.onChange(Boolean(checked))
                                    }
                                />
                                <FieldLabel htmlFor="agree">
                                    אני מאשר/ת את תנאי ההגשה
                                </FieldLabel>
                            </Field>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="col-span-3 flex justify-center items-center w-full mx-auto">
                    <Button
                        type="submit"
                        className="w-full h-10 rounded-2xl"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Spinner className="size-6 animate-spin" />
                        ) : (
                            "שליחה"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
