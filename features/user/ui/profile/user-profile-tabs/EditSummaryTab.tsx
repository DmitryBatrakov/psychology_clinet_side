"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { CalendarIcon, CircleUserRound, Pen, Plus, Trash2 } from "lucide-react";
import { useAtomValue } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

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
import { cn, languagesList } from "@/lib/utils";
import { notify } from "@/lib/notify";

import { updateProfileFormSchema } from "@/features/user/validation";
import type {
    UpdateProfileFormValues,
    UpdateProfileApiInput,
} from "@/features/user/validation";
import type { UserProfile } from "@/features/user/model/types";
import { authAtom } from "@/src/store/auth/authAtom";
import { updateUserProfile } from "../../../api/updateUserProfile";
import { useAvatar } from "../../../hooks/useAvatar";

type TimestampLike = { toDate: () => Date };

const toDate = (value: unknown): Date | undefined => {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    if (typeof value === "string") return parseISO(value);
    if (
        typeof value === "object" &&
        value !== null &&
        "toDate" in value &&
        typeof (value as TimestampLike).toDate === "function"
    ) {
        return (value as TimestampLike).toDate();
    }
    return undefined;
};

export function EditSummaryTab({ dbUser }: { dbUser?: UserProfile | null }) {
    const queryClient = useQueryClient();
    const { user } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;

    const form = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: undefined,
            gender: "male",
            languages: [],
            photoUrl: null,
        },
    });

    useEffect(() => {
        if (!dbUser) return;
        form.reset({
            firstName: dbUser.firstName ?? "",
            lastName: dbUser.lastName ?? "",
            phoneNumber: dbUser.phoneNumber ?? "",
            birthDate: toDate(dbUser.birthDate),
            gender: dbUser.gender ?? "male",
            languages: dbUser.languages ?? [],
            photoUrl: dbUser.photoUrl ?? null,
        });
    }, [dbUser, form]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            notify.success("הפרופיל עודכן בהצלחה");
            onProfileSaved();
            if (uid) {
                queryClient.refetchQueries({ queryKey: ["user", uid] });
            }
        },
        onError: (error: Error) => {
            notify.error(error?.message ?? "עדכון הפרופיל נכשל");
        },
    });

    const currentPhotoUrl = useWatch({
        control: form.control,
        name: "photoUrl",
    });

    const {
        fileInputRef,
        avatarPreview,
        isUploading,
        isDeleting,
        handleFileChange,
        handleRemove,
        onProfileSaved,
    } = useAvatar({
        uid,
        currentPhotoUrl,
        onUrlChange: (url) =>
            form.setValue("photoUrl", url, {
                shouldDirty: true,
                shouldTouch: true,
            }),
    });

    const onSubmit = (data: UpdateProfileFormValues) => {
        const payload: Partial<UpdateProfileApiInput> = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            birthDate: data.birthDate
                ? format(data.birthDate, "yyyy-MM-dd")
                : undefined,
            gender: data.gender,
            languages: data.languages,
            photoUrl: data.photoUrl,
        };
        mutate(payload);
    };

    const displaySrc = avatarPreview ?? currentPhotoUrl;

    return (
        <Card className="border bg-white">
            <CardHeader>
                <CardTitle className="text-xl">עריכת פרופיל</CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="relative w-24 h-24">
                                <div
                                    className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    {displaySrc ? (
                                        <Image
                                            src={displaySrc}
                                            alt="Avatar"
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full"
                                         
                                        />
                                    ) : (
                                        <CircleUserRound
                                            size={100}
                                            color="purple"
                                        />
                                    )}
                                </div>

                                <div
                                    className="bg-primary p-0.5 rounded-full w-6 h-6 flex items-center justify-center absolute right-0 bottom-0 cursor-pointer"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    {displaySrc ? (
                                        <Pen size={14} color="white" />
                                    ) : (
                                        <Plus size={20} color="white" />
                                    )}
                                </div>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <div className="flex gap-2">
                                {displaySrc && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        disabled={isUploading || isDeleting}
                                        onClick={handleRemove}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        {isDeleting ? (
                                            "מוחק..."
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>שם פרטי</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
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
                                            <Input placeholder="" {...field} />
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
                                                        <span>בחר תאריך</span>
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
                                                        new Date("1920-01-01")
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
                                                    const current =
                                                        field.value ?? [];
                                                    return (
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={current.includes(
                                                                        lang.id,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) =>
                                                                        checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...current,
                                                                                      lang.id,
                                                                                  ],
                                                                              )
                                                                            : field.onChange(
                                                                                  current.filter(
                                                                                      (
                                                                                          v,
                                                                                      ) =>
                                                                                          v !==
                                                                                          lang.id,
                                                                                  ),
                                                                              )
                                                                    }
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
                            disabled={isPending || !form.formState.isDirty}
                        >
                            {isPending ? "שומר..." : "שמור"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
