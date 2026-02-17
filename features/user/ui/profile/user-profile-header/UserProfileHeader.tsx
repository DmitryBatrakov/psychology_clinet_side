import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

export const UserProfileHeader = () => {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;
    const { data: dbUser } = useUserData(uid, authLoading);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl min-h-full flex flex-col gap-5 items-center justify-center ">
                <div className="w-full p-2 flex flex-col justify-center items-center">
                    {dbUser?.photoUrl ? (
                        <Image
                            src={dbUser?.photoUrl}
                            alt="Photo"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <CircleUserRound size={100} color="purple" />
                    )}
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {dbUser?.firstName} {dbUser?.lastName}
                    </h1>
                    <h2 className="text-sm opacity-60">{user?.email}</h2>
                </div>
            </div>
        </div>
    );
};
