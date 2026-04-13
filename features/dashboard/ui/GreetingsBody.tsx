import { Skeleton } from "@/components/ui/skeleton"
import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";


export function GreetingSectionBody() {

    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data, isLoading } = useUserData(user?.uid ?? null, authLoading);

    if (!data) {
        return;
    }

    if(isLoading) {
        return <GreetingSectionSkeleton />
    }

    return (
        <div className="">
            <h1 className="text-[1.5rem] h-10">שלום {data.firstName} {data.lastName}!</h1>
        </div>
    )
}

export function GreetingSectionSkeleton() {
    return (
        <div className="flex flex-col gap-4 h-full justify-between">
            <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-32 animate-pulse" />
                    <Skeleton className="h-3 w-20 animate-pulse" />
                <Skeleton className="h-4 w-14 animate-pulse" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 animate-pulse" />
                <Skeleton className="h-8 flex-1 animate-pulse" />
            </div>
        </div>
    )
}