'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteSchema, InviteFormValues } from '@/features/invitations/validation';
import { cn } from '@/lib/utils';
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSendInvitation } from '@/features/invitations/hooks/useSendInvitation';
import { CheckCircle, XCircle, XIcon } from 'lucide-react';

interface Props {
    open: boolean;
    onClose: () => void;
}

export function QuickAddClientsModal({ open, onClose }: Props) {
    const { mutate, isPending, isSuccess, isError, error, reset: resetMutation } = useSendInvitation();
    const MESSAGE_MAX = 500;

    const form = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { email: '', message: '' },
    });

    const messageLength = form.watch('message')?.length ?? 0;

    const handleClose = () => {
        form.reset();
        resetMutation();
        onClose();
    };

    const resetToForm = () => {
        resetMutation();
        form.reset();
    };

    const onSubmit = (values: InviteFormValues) => {
        mutate({ email: values.email, message: values.message }, {
            onSuccess: () => setTimeout(resetToForm, 3000),
            onError: () => setTimeout(resetMutation, 3000),
        });
    };

    return (
        <Sheet open={open} onOpenChange={(o) => !o && !isPending && handleClose()}>
            <SheetPrimitive.Portal>
                <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <SheetPrimitive.Content
                    dir="rtl"
                    className={cn(
                        'bg-background fixed inset-y-0 right-0 z-50 flex h-full w-3/4 flex-col gap-0 border-l shadow-lg transition ease-in-out sm:max-w-md',
                        'data-[state=open]:animate-in data-[state=closed]:animate-out',
                        'data-[state=closed]:duration-300 data-[state=open]:duration-500',
                        'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
                        'overflow-hidden',
                    )}
                >
                    <SheetPrimitive.Close
                        disabled={isPending}
                        className="absolute top-4 left-4 rounded-sm bg-primary p-1 text-foreground opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                    >
                        <XIcon />
                        <span className="sr-only">סגור</span>
                    </SheetPrimitive.Close>

                    <SheetHeader className="border-b pb-4 shrink-0">
                        <SheetTitle>הזמן מטופל חדש</SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col flex-1 overflow-y-auto px-4 py-4">
                        {isSuccess ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                                <CheckCircle className="size-12 text-green-500" />
                                <p className="font-medium">ההזמנה נשלחה בהצלחה!</p>
                                <p className="text-sm text-muted-foreground">{form.getValues('email')}</p>
                            </div>
                        ) : isError ? (
                            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                                <XCircle className="size-12 text-destructive" />
                                <p className="font-medium">שגיאה בשליחת ההזמנה</p>
                                <p className="text-sm text-muted-foreground">
                                    {error instanceof Error ? error.message : 'נסה שוב מאוחר יותר'}
                                </p>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>כתובת אימייל</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="example@gmail.com"
                                                        type="email"
                                                        dir="ltr"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    הודעה אישית
                                                    <span className="text-muted-foreground font-normal"> (אופציונלי)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="כתוב כאן הודעה אישית למטופל..."
                                                        rows={3}
                                                        maxLength={MESSAGE_MAX}
                                                        {...field}
                                                        className="overflow-y-auto max-h-50 min-h-50"
                                                    />
                                                </FormControl>
                                                <div className="flex justify-between items-center">
                                                    <FormMessage />
                                                    <span className={`text-xs mr-auto ${messageLength >= MESSAGE_MAX ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                        {messageLength}/{MESSAGE_MAX}
                                                    </span>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? 'שולח...' : 'שלח הזמנה'}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </SheetPrimitive.Content>
            </SheetPrimitive.Portal>
        </Sheet>
    );
}
