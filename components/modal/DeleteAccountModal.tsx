/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDeleteAccount } from "@/features/auth/hooks";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { notify } from "@/lib/notify";

export function DeleteAccountModal() {
    const [open, setOpen] = useState(false);
    const deleteAccountMutation = useDeleteAccount();
    const router = useRouter();
    const isLoading = deleteAccountMutation.isPending;

    const handleDelete = () => {
        deleteAccountMutation.mutate(undefined, {
            onSuccess: () => {
                notify.success("Account successfully deleted");
                setOpen(false);
                router.replace("/dashboard");
            },
            onError: (error: any) => {
                notify.error(error?.message ?? "Failed to delete account");
            },
        });
    };


    return (
        <AlertDialog
            open={open}
            onOpenChange={(next) => {
                if (isLoading) return;
                setOpen(next);
            }}
        >
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Удалить аккаунт</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-xl">
                        Удалить аккаунт навсегда?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                        Все ваши данные, включая профиль, историю консультаций и
                        баланс, будут удалены без возможности восстановления.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" size="sm" disabled={isLoading}>
                            Отмена
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete()}
                        >
                            {isLoading
                                ? "Удаляем..."
                                : "Удалить навсегда"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
