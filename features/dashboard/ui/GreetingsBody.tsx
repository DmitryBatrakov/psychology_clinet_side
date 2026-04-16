import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"
import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { Megaphone, Banknote } from 'lucide-react';
import Link from "next/link";
import { FaShekelSign } from "react-icons/fa";
import { useScheduleDay } from "../hooks/useScheduleDay";
import { getSessionMessage } from '../lib/getSessionMessage'
import { useMemo } from "react";

export function GreetingSectionBody() {

    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data: userData, isLoading: isUserLoading } = useUserData(user?.uid ?? null, authLoading);
    const { data: scheduleData, isLoading: isScheduleLoading } = useScheduleDay(user?.uid ?? null, authLoading);
    const sessionCount = scheduleData?.items.length ?? 0;
    const test = 10
    const sessionMessage = useMemo(() => getSessionMessage(sessionCount), [sessionCount]);

    if (isUserLoading || isScheduleLoading) {
        return <GreetingSectionSkeleton />
    }

    if (!userData) {
        return (
            <div className="w-full h-full">
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                    <Badge className="text-sm text-foreground px-3 py-1">שגיאה בטעינת הנתונים</Badge>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full h-full justify-between p-2">
            <div className="flex justify-between w-full items-center">
                <div className=" flex items-center">
                    <h1 className="text-[1.5rem] font-semibold h-10">שלום {userData?.firstName} {userData?.lastName}!</h1>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-base text-foreground font-semibold">יש עידכונים חדשים</span>
                    <Link href="/inbox" className="flex flex-col items-center justify-center p-2.5 bg-primary rounded-full relative cursor-pointer hover:scale-95 duration-200 transform-all">
                        <span className="absolute w-3.5 h-3.5 bg-red-600 rounded-full -top-0.5 -right-0.5" />
                        <Megaphone className="text-foreground" size={25} />
                    </Link>
                </div>
            </div>
            <div className=" w-full h-full flex flex-col items-start justify-between ">
                <div className="flex items-center justify-start gap-5 ">
                    <div className="flex items-center justify-center gap-5">
                        <div className="flex items-center justify-between gap-2 text-base text-foreground bg-primary/20 p-3 rounded-lg shadow-[inset_0_0_10px_0] shadow-black/15">
                            <span className="text-foreground text-base">יתרה שלך :</span>
                            <div className="flex items-center justify-center">
                                <FaShekelSign />
                                <span>{userData?.balance}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-base font-medium text-green-600 border border-green-600/40 bg-green-600/10 px-3 py-2.5 rounded-lg hover:bg-green-600/20 hover:scale-95 transition-all duration-200 cursor-pointer">
                            <Link href="/">למשוך כסף מיתרה</Link>
                            <Banknote size={18} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-full relative">
                    <div className="w-60 h-60 absolute left-0 bottom-0">
                        <Image
                            src='/assets/images/hero/imageHero.png'
                            alt="Welcome Mascot"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="h-full w-2/3 flex items-center justify-center mt-20">
                        <div className="w-full inline-flex items-center justify-center border border-white border-dotted rounded-full bg-primary/20 shadow-[inset_0_0_10px_0] shadow-black/10 p-4">
                            <div className="p-2 w-full flex items-center justify-center">
                                <p className="text-foreground text-base font-semibold">{sessionMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function GreetingSectionSkeleton() {
    return (
        <div className="flex flex-col gap-10 h-full justify-start items-start">
            <div className="flex items-center gap-3">
                <Skeleton className="h-18 w-18 rounded-full animate-pulse" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-3 w-32 animate-pulse" />
                    <Skeleton className="h-2.5 w-24 animate-pulse" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-32 animate-pulse" />
                <Skeleton className="h-4 w-32 animate-pulse" />
            </div>
        </div>
    )
}