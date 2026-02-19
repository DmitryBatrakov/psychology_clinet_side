/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
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
import { useDeleteAccount } from "@/features/auth/hooks/useDeleteFunction";

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
                <Button variant="destructive">מחיקת חשבון</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-bold text-xl">
                        למחוק את החשבון לצמיתות?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md">
                        כל הנתונים שלך, כולל הפרופיל, היסטוריית הייעוצים והיתרה, יימחקו ללא אפשרות שחזור.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" size="sm" disabled={isLoading}>
                            ביטול
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete()}
                        >
                            {isLoading
                                ? "מוחק..."
                                : "למחוק לצמיתות"}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
