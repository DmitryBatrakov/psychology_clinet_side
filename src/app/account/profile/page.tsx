"use client";

import { Spinner } from "@/components/ui/spinner";
import { UserProfileHeader } from "@/components/userProfile/user-profile-header/UserProfileHeader";
import { UserProfileActions } from "@/components/userProfile/user-profile-actions/UserProfileActions";
import { useUserData } from "@/features/user/hooks";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import { UserProfileInfo } from "@/components/userProfile/user-profile-info/UserProfileInfo";
import { useSearchParams } from "next/navigation";

export default function Profile() {
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
            {/* <UserProfileHeader />
            <UserProfileInfo />

            <UserProfileActions /> */}
            {!section && (
                <>
                    <UserProfileHeader />
                    <UserProfileInfo />
                </>
            )}
            <UserProfileActions />
        </div>
    );
}
