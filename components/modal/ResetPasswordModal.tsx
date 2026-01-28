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
import { usePasswordReset } from "@/features/auth/hooks";

export function ForgotPasswordDialog() {
  const [email, setEmail] = useState("");
  const passwordResetMutation = usePasswordReset();

  const handleReset = () => {
    if (email) {
      passwordResetMutation.mutate(email);
    }
  };

  return (
    <Dialog>
      {/* ✅ DialogTrigger — внутри Dialog */}
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-sm">
          Забыли пароль?
        </Button>
      </DialogTrigger>
      
      {/* ✅ DialogContent — внутри Dialog */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Сбросить пароль</DialogTitle>
          <DialogDescription>
            Введите email — отправим инструкции для смены пароля
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            type="button"
            onClick={() => passwordResetMutation.reset()} 
          >
            Отмена
          </Button>
          <Button
            onClick={handleReset}
            disabled={passwordResetMutation.isPending || !email}
          >
            {passwordResetMutation.isPending ? "Отправляем..." : "Отправить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
