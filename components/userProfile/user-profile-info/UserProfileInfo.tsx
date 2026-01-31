"use client";

import { useUserData } from "@/features/user/hooks";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const menuItems = [
    { title: "Time zone", href: "/account/profile/time-zone", id: 1 },
    { title: "Personal information", href: "/account/profile/personal-info", id: 2 },
    { title: "Support", href: "/account/profile/suport", id: 3 },
    { title: "Privacy policy rules", href: "/account/profile/privacy-policy", id: 4 },
] as const;

export const UserProfileInfo = () => {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;
    const { data: dbUser, isPending, isError, error } = useUserData(uid, authLoading);

    if (authLoading || isPending) return <div>טוען...</div>;
    if (!user) return <div>Нет доступа</div>;
    if (isError) {
        return <div>Ошибка загрузки профиля: {(error as Error).message}</div>;
    }
    if (!dbUser) return <div>Профиль не найден</div>;

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl min-h-full flex flex-col gap-5 items-center justify-center ">
                <div className="w-full p-2 flex flex-col justify-center items-center border-2 border-black">
                    {dbUser.photoUrl ? (
                        <Image src={dbUser.photoUrl} alt="Photo" width={100} height={100} />
                    ) : (
                        <CircleUserRound size={100} color="purple" />
                    )}
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {dbUser?.firstName} {dbUser.lastName}
                    </h1>
                    <h2 className="text-sm opacity-60">{user.email}</h2>
                </div>
                <div className="w-full max-w-lg">
                    <h2 className="py-3 -mr-2" >Personal information</h2>
                    <div className=" rounded-lg overflow-hidden">
                        {menuItems.map((item) => (
                            <div key={item.id} className="border-b last:border-b-0 w-full">
                                <Link href={item.href} className="flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 ">
                                    <div>{item.title}</div>
                                    <div>
                                        <MdOutlineKeyboardArrowLeft />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

{
    /* <div className="w-full max-w-4xl min-h-full flex flex-col gap-5 items-center justify-center ">
                <div className="w-full my-5">
                    <h1 className="text-5xl font-medium">היי, {dbUser?.firstName} !</h1>
                </div>
                <div className="bg-gray-200 rounded-2xl grid grid-cols-2 justify-around w-full items-center gap-10 min-h-60 p-5">
                    <div className="w-full p-2 flex justify-center items-center">
                        {dbUser.photoUrl ? (
                            <Image src={dbUser.photoUrl} alt="Photo" width={250} height={250} />
                        ) : (
                            <CircleUserRound size={250} color="white" />
                        )}
                    </div>
                    <div className="flex flex-col gap-6 flex-1 justify-between items-center">
                        <div className="flex w-full h-full items-center p-2">
                            <div className="flex flex-1 flex-col gap-4 justify-end items-center">
                                <span className="font-bold">הפרופיל שלי</span>
                                <span>
                                    {dbUser?.firstName} {dbUser?.lastName}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-4 justify-center items-center">
                                <span className="font-bold">יתרה</span>
                                <span>{dbUser?.balance}</span>
                            </div>
                        </div>
                        <div className="p-2 grid grid-rows-2 grid-cols-2 gap-5">
                            <div className="flex items-center justify-start gap-2">
                                <div className="bg-black/10 p-1.5 rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <span>
                                    {dbUser.birthDate ? format(new Date(dbUser.birthDate), "dd.MM.yyyy") : "Не указана"}
                                </span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <div className="bg-black/10 p-1.5 rounded-lg">
                                    <VenusAndMars size={20} />
                                </div>
                                <span>{dbUser.gender}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <div className="bg-black/10 p-1.5 rounded-lg">
                                    <AtSign size={20} />
                                </div>
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <div className="bg-black/10 p-1.5 rounded-lg">
                                    <Phone size={20} />
                                </div>
                                <span dir="ltr">{dbUser.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex gap-5 justify-between items-center ">
                    <div className="bg-gray-200 rounded-2xl flex-1 min-h-60 p-5 flex flex-col justify-between">
                        <h2 className="text-2xl font-medium">פגישות קרובות</h2>
                        <div className="flex-1 flex justify-center items-center">
                            <span>עדיין אין לך פגישות</span>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-2xl flex-1 min-h-60 p-5 flex flex-col justify-between">
                        <h2 className="text-2xl font-medium">הפסיכולוג שלי</h2>
                        <div className="flex-1 flex justify-center items-center">
                            <span>מידע על הפסיכולוג יופיע לאחר הפגישה</span>
                        </div>
                    </div>
                </div>
            </div> */
}
