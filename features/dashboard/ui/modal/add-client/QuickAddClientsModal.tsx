'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteSchema, InviteFormValues } from '@/features/invitations/validation';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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
import { CheckCircle, XCircle } from 'lucide-react';

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
        <Dialog open={open} onOpenChange={(o) => !o && !isPending && handleClose()}>
            <DialogContent
                dir="rtl"
                className="sm:max-w-150  sm:min-h-80 *:data-[slot=dialog-close]:right-auto *:data-[slot=dialog-close]:left-5 *:data-[slot=dialog-close]:top-5 *:data-[slot=dialog-close]:bg-primary *:data-[slot=dialog-close]:p-1 *:data-[slot=dialog-close]:rounded-sm *:data-[slot=dialog-close]:text-foreground"
            >
                <DialogHeader>
                    <DialogTitle className="text-right">הזמן מטופל חדש</DialogTitle>
                </DialogHeader>

                <div className="min-h-100 flex flex-col">
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
            </DialogContent>
        </Dialog>
    );
}
