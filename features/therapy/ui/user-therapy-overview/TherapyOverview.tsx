"use client";

//import Image from "next/image";
import { TherapyData } from "../../hooks/useTherapyData";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UseQueryResult } from "@tanstack/react-query";

type TherapyDataProps = {
    userData: TherapyData["dbUser"];
    specialistData: TherapyData["specialist"];
};

export const TherapyOverview = ({
    userData,
    specialistData,
}: TherapyDataProps) => {

    const specialist = specialistData.data;
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="w-full max-w-3xl">
                <div className="w-full mt-5 mb-20">
                    <h1 className="text-3xl font-bold">הטיפול שלי</h1>
                </div>
                <div className="grid w-full gap-5 grid-cols-1 sm:grid-cols-2">
                    <div className="rounded-md bg-gray-200 min-w-20 flex flex-col justify-between items-center gap-6 p-4">
                    <h1 className="text-rihgt w-full p-0 m-0">פגישה הבאה</h1>
                        {specialist ? (
                            <div className="flex gap-4 justify-between items-start w-full">
                                <div className="shrink-0 flex justify-center items-center h-full px-3">
                                    {specialist.photoUrl ? (
                                        <Image
                                            src={
                                                specialist.photoUrl
                                            }
                                            alt="Specialist Photo"
                                            width={100}
                                            height={100}
                                        />
                                    ) : (
                                        <CircleUserRound
                                            size={70}
                                            color="purple"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <span>{specialist.firstName}</span>
                                    <span>
                                        ניסיון: {specialist.experience} שנים
                                    </span>
                                    <span>{specialist.profession}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-center py-4">
                                <CircleUserRound size={70} color="purple" />
                                <p className="text-gray-600 text-sm">
                                    עדיין לא שויך מומחה
                                </p>
                            </div>
                        )}
                        <div className="w-full flex justify-center items-center">
                            <Button className="w-full">הזמן</Button>
                        </div>
                    </div>
                    <div className="rounded-md bg-gray-200 min-w-20 p-2 flex flex-col justify-center items-center gap-2">
                        <span>
                            שלום, {userData.data?.firstName}{" "}
                            {userData.data?.lastName}
                        </span>
                        <span>איך אתה היום?</span>
                        <Button className=" bg-blue-400 rounded-full">+</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
