"use client";

import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { UserProfileHeader } from "@/features/user/ui/profile/user-profile-header/UserProfileHeader";
import { UserProfileActions } from "@/features/user/ui/profile/user-profile-actions/UserProfileActions";
import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import { UserProfileSummary } from "@/features/user/ui/profile/user-profile-summary/UserProfileSummary";
import { useSearchParams } from "next/navigation";

function ProfileContent() {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;
    const { isPending, isError, error } = useUserData(uid, authLoading);

    const searchParams = useSearchParams();
    const section = searchParams.get("section");

    if (authLoading || isPending) {
        return (
            <div className="w-full flex justify-center items-center min-h-[90vh]">
                <Spinner className="size-8 text-gray-600" />
            </div>
        );
    }

    if (!user) return;
    if (isError) {
        return <div>Ошибка загрузки профиля: {(error as Error).message}</div>;
    }

    return (
        <div className="flex flex-col gap-5">
            {!section && (
                <>
                    <UserProfileHeader />
                    <UserProfileSummary />
                </>
            )}
            <UserProfileActions />
        </div>
    );
}

export default function Profile() {
    return (
        <Suspense
            fallback={
                <div className="w-full flex justify-center items-center min-h-[90vh]">
                    <Spinner className="size-8 text-gray-600" />
                </div>
            }
        >
            <ProfileContent />
        </Suspense>
    );
}
