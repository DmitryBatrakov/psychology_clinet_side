"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "@/src/store/authAtom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { user, role, loading } = useAtomValue(authAtom);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/register");
        }
    }, [user, loading, router]);

    // if (loading)
    //     return (
    //         <div className="p-10 text-center text-black">
    //             Загрузка данных пользователя...
    //         </div>
    //     );

    return (
        <div className="p-10 text-black">
            <h1 className="text-3xl font-bold mb-4">
                Добро пожаловать, {user?.email}
            </h1>
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200 inline-block">
                Твоя текущая роль:{" "}
                <span className="font-mono font-bold text-blue-700">
                    {role}
                </span>
            </div>

            <div className="mt-8 space-y-4">
                {role === "user" && (
                    <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-300">
                        <h2 className="text-xl font-semibold text-yellow-800">
                            Вы обычный пользователь
                        </h2>
                        <p className="mt-2 text-yellow-700">
                            Хотите помогать людям?
                        </p>
                        <button
                            onClick={() => router.push("/apply")}
                            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                        >
                            Подать заявку на специалиста
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
