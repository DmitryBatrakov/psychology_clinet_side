/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/lib/notify";
import { usePasswordReset } from "@/features/auth/hooks/usePasswordReset";

export function ForgotPasswordDialog() {
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const passwordResetMutation = usePasswordReset();

    const closeAndReset = () => {
        setEmail("");
        passwordResetMutation.reset();
        setIsOpen(false);
    };

    const handleReset = () => {
        if (email) {
            passwordResetMutation.mutate(email, {
                onSuccess: () => {
                    notify.success("המייל נשלח בהצלחה");
                    closeAndReset();
                },
                onError: (error: any) => {
                    notify.error(error?.message ?? "משהו השתבש");
                },
            });
        }
    };

    const isLoading = passwordResetMutation.isPending;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(next) => {
                if (isLoading) return;
                setIsOpen(next);
                if (!next) {
                    setEmail("");
                    passwordResetMutation.reset();
                }
            }}
        >
            <DialogTrigger asChild>
                <Button variant="link" className="pr-3 h-auto text-sm">
                    שכחת סיסמה?
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md" dir="rtl">
                <DialogHeader>
                    <DialogTitle>איפוס סיסמה</DialogTitle>
                    <DialogDescription>
                        הזן אימייל — נשלח הוראות לאיפוס הסיסמה
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reset-email">אימייל</Label>
                        <Input
                            id="reset-email"
                            type="email"
                            placeholder="your@email.com"
                            dir="ltr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={closeAndReset}
                    >
                        ביטול
                    </Button>
                    <Button
                        onClick={handleReset}
                        disabled={isLoading || !email}
                    >
                        {isLoading ? "שולח..." : "שלח"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
