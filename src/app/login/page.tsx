"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppNavigation } from "@/src/hooks/useAppNavigation";

import {
    LoginFormValues,
    loginSchema,
} from "@/src/app/validation/validation.user";

// Shadcn UI компоненты
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
import { useAuthActions } from "@/src/hooks/auth/useAuthActions";

export default function LoginPage() {
    const [serverError, setServerError] = useState("");
    const { goToDashboard, goToRegister } = useAppNavigation();
    const { login } = useAuthActions();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setServerError("");
        try {
            await login(data.email, data.password);
            // После логина летим в Dashboard,
            // а там сработает твой AuthGuard, если профиль не заполнен
            goToDashboard();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setServerError("Неверный логин или пароль");
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Вход
                    </CardTitle>
                    <CardDescription className="text-center">
                        Добро пожаловать! Введите свои данные для входа
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
                                    ? "Вход..."
                                    : "Войти"}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Нет аккаунта?{" "}
                        <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            onClick={() => goToRegister()}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}