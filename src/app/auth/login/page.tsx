"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { LoginFormValues, loginSchema } from "@/features/auth/validation";

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
import { useGoogleAuth } from "@/features/auth/hooks/useGoogleAuth";
import { ForgotPasswordDialog } from "@/components/modal/ResetPasswordModal";
import { fetchAuthUser } from "@/features/user/api/fetchAuthUser";
import { login } from "@/features/auth/hooks/useLogin";
import { notify } from "@/lib/notify";
import { getErrorMessage } from "@/lib/api-error";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
    const [serverError, setServerError] = useState("");
    const router = useRouter();
    const googleMutation = useGoogleAuth();

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
            const userCredential = await login(data.email, data.password);
            const idToken = await userCredential.user.getIdToken();

            await fetch("/api/auth/session/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });

            const me = await fetchAuthUser();

            if (!me.profileComplete) {
                router.replace("/auth/onboarding");
                return;
            }

            router.push("/account/therapy");
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
                        Login
                    </CardTitle>
                    <CardDescription className="text-center">
                        Welcome back! Please sign in to your account
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
                                        <FormLabel>Password</FormLabel>
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

                            <div>
                                <ForgotPasswordDialog />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <Spinner />
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <Button
                        type="button"
                        variant="default"
                        className="w-full mt-4 gap-2"
                        onClick={() =>
                            googleMutation.mutate(undefined, {
                                onSuccess: () =>
                                    notify.success(
                                        "Login with Google successful!",
                                    ),
                                onError: (error) =>
                                    notify.error(getErrorMessage(error)),
                            })
                        }
                        disabled={googleMutation.isPending}
                    >
                        <span>
                            {googleMutation.isPending
                                ? "Loading..."
                                : "Sign In with Google"}
                        </span>
                        <FcGoogle />
                    </Button>
                    <div className="mt-4 text-center text-sm text-gray-500">
                        <span>Already have an account? </span>
                        <button
                            type="button"
                            className="text-primary hover:underline font-medium"
                            onClick={() => router.push("/auth/register")}
                        >
                            Sign up
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
