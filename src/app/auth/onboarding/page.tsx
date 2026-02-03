"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
    { id: "he", label: "Hebrew" },
    { id: "ru", label: "Русский" },
    { id: "en", label: "English" },
    { id: "uk", label: "Українська" },
    { id: "ar", label: "Arabic" },
] as const;

export default function OnboardingPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;

    const { mutate } = useMutation({
        mutationFn: (data: UserData) => completeOnboarding(data),

        onSuccess: () => {
            notify.success("Onboarding completed successfully");
            queryClient.refetchQueries({
                queryKey: ["user", uid],
            });
            router.replace("/dashboard");
        },
        onError: (error) => {
            notify.error(error?.message ?? "Failed to complete onboarding");
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
        mutate({
            ...data,
            birthDate: format(data.birthDate, "yyyy-MM-dd"),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Завершение регистрации
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Имя и Фамилия */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Имя</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Иван"
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
                                            <FormLabel>Фамилия</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Иванов"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Телефон */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер телефона</FormLabel>
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

                            {/* Дата рождения */}
                            <FormField
                                control={form.control}
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Дата рождения</FormLabel>
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
                                                            format(
                                                                field.value,
                                                                "PPP",
                                                            )
                                                        ) : (
                                                            <span>
                                                                Выберите дату
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    captionLayout="dropdown"
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

                            {/* Пол */}
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Пол</FormLabel>
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
                                                        Мужской
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="female" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Женский
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Языки */}
                            <FormField
                                control={form.control}
                                name="languages"
                                render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                            <FormLabel>Языки</FormLabel>
                                            <FormDescription>
                                                Выберите языки, которыми вы
                                                владеете.
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
                                    ? "Сохранение..."
                                    : "Завершить"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
