import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { Timestamp } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { IoMale } from "react-icons/io5";
import { IoFemaleSharp } from "react-icons/io5";

export const UserProfileSummary = () => {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;
    const { data: dbUser } = useUserData(uid, authLoading);

    console.log(dbUser?.birthDate);

    const toJsDate = (v: Timestamp | Date | string) => {
        if (v instanceof Timestamp) return v.toDate();
        if (v instanceof Date) return v;
        return new Date(v);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-lg">
                <h2 className="py-3 -mr-1 font-bold text-gray-700">Personal details</h2>
                <div className="w-full rounded-lg bg-gray-100 p-4 grid grid-cols-2 gap-y-4 justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-semibold text-gray-700">Balance</span>
                        <span>{dbUser?.balance}</span>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <span className="font-semibold text-gray-700">Gender</span>
                        <span>
                            {dbUser?.gender === "male" ? (
                                <IoMale size={22} color="blue" strokeWidth={18}  />
                            ) : dbUser?.gender === "female" ? (
                                <IoFemaleSharp size={22} color="pink" strokeWidth={18} />
                            ) : (
                                <span>none</span>
                            )}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-semibold text-gray-700">Phone</span>
                        <span>{dbUser?.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-semibold text-gray-700">Birthday</span>
                        <span>{dbUser?.birthDate ? toJsDate(dbUser.birthDate).toLocaleDateString("he-IL") : "—"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
