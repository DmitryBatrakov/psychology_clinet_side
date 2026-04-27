"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardingSchema } from "@/features/onboarding/validation";
import { completeOnboarding } from "@/features/onboarding/hooks/completeOnboarding";
import { UserData } from "@/features/user/model/types";
import { notify } from "@/lib/notify";
import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/auth/authAtom";

const languagesList = [
    { id: "he", label: "עברית" },
    { id: "ru", label: "רוסית" },
    { id: "en", label: "אנגלית" },
    { id: "ar", label: "ערבית" },
] as const;

export default function OnboardingPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;

    const { mutate } = useMutation({
        mutationFn: (data: UserData) => completeOnboarding(data),

        onSuccess: () => {
            notify.success("ההרשמה הושלמה בהצלחה");
            queryClient.refetchQueries({
                queryKey: ["user", uid],
            });
            router.replace("/account/profile");
        },
        onError: (error) => {
            notify.error(error?.message ?? "ההרשמה נכשלה");
        },
    });

    const form = useForm<UserData>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            languages: [],
            gender: "male",
            photoUrl: null,
        },
    });

    const onSubmit = (data: UserData) => {
        mutate(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6" dir="rtl">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        השלמת הרשמה
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>שם פרטי</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ישראל"
                                                    {...field}
                                                />
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
                                            <FormLabel>שם משפחה</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ישראלי"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>מספר טלפון</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+972..."
                                                {...field}
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
                                        <FormLabel>תאריך לידה</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full pl-3 text-right font-normal",
                                                            !field.value &&
                                                            "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP", { locale: he })
                                                        ) : (
                                                            <span>בחר תאריך</span>
                                                        )}
                                                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
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
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                        new Date(
                                                            "1920-01-01",
                                                        )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>מין</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="male" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        זכר
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="female" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        נקבה
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="languages"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel>שפות</FormLabel>
                                            <FormDescription>
                                                בחר את השפות שאתה דובר.
                                            </FormDescription>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {languagesList.map((lang) => (
                                                <FormField
                                                    key={lang.id}
                                                    control={form.control}
                                                    name="languages"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={lang.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            lang.id as any,
                                                                        )}
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            return checked
                                                                                ? field.onChange(
                                                                                    [
                                                                                        ...field.value,
                                                                                        lang.id,
                                                                                    ],
                                                                                )
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (
                                                                                            value,
                                                                                        ) =>
                                                                                            value !==
                                                                                            lang.id,
                                                                                    ),
                                                                                );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {lang.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting
                                    ? "שומר..."
                                    : "סיום"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
