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
        <div className="flex flex-col items-center gap-3">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100 relative">
                {dbUser?.photoUrl ? (
                    <Image
                        src={dbUser.photoUrl}
                        alt="Photo"
                       fill
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <CircleUserRound size={100} color="purple" />
                )}
            </div>
            <div className="flex flex-col items-center gap-0.5">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {dbUser?.firstName} {dbUser?.lastName}
                </h1>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
        </div>
    );
};
