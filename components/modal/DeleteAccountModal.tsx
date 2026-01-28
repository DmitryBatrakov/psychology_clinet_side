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

export function DeleteAccountModal() {
    const [open, setOpen] = useState(false);
    const deleteAccountMutation = useDeleteAccount();
    const router = useRouter();

    const handleDelete = () => {
        deleteAccountMutation.mutate();
        setOpen(false);
        router.replace("/dashboard");
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Удалить аккаунт</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>    
                {/* ✅ ОБЯЗАТЕЛЬНО: Header с Title + Description */}
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-xl">
                        Удалить аккаунт навсегда?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                        Все ваши данные, включая профиль, историю консультаций и
                        баланс, будут удалены без возможности восстановления.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {/* ✅ Кнопки */}
                <AlertDialogFooter>
                    {/* <AlertDialogCancel className="bg-blue-400 px-3 py-2 text-white rounded-lg">Отмена</AlertDialogCancel> */}
                    <AlertDialogCancel asChild>
                        <Button variant="outline" size="sm" onClick={() => {}}>
                            Отмена
                        </Button>
                    </AlertDialogCancel>
                    {/* <AlertDialogAction
                        onClick={() => deleteAccountMutation.mutate()}
                        disabled={deleteAccountMutation.isPending}
                        className="bg-red-600 px-3 py-2 text-white rounded-lg"
                    >
                        {deleteAccountMutation.isPending
                            ? "Удаляем..."
                            : "Удалить навсегда"}
                    </AlertDialogAction> */}
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete()}
                        >
                            {deleteAccountMutation.isPending
                                ? "Удаляем..."
                                : "Удалить навсегда"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
