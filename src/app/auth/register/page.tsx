"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    RegisterFormValues,
    registerSchema,
} from "@/features/auth/validation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { register } from "@/features/auth/hooks";

export default function RegisterPage() {
    const [serverError, setServerError] = useState("");

    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setServerError("");
        try {
            await register(data.email, data.password);
            router.push("/auth/onboarding");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setServerError(err.message || "Ошибка при регистрации");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Регистрация
                    </CardTitle>
                    <CardDescription className="text-center">
                        Создайте аккаунт, чтобы продолжить
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {serverError && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        {serverError}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@gmail.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
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
                                    ? "Создание..."
                                    : "Зарегистрироваться"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Уже есть профиль?{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            onClick={() => router.push("/auth/login")}
                        >
                            Войти
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
