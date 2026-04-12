"use client";

import { TherapyData } from "../../hooks/useTherapyData";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    MEETING_FORMAT_LABELS,
    PROFESSION_LABELS,
} from "@/features/specialist/model/specialistLabels";
import { MeetingFormat, Profession } from "@/features/specialist/model/types";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

type TherapyDataProps = {
    userData: TherapyData["dbUser"];
    upcomingSessionData: TherapyData["upcomingSession"];
};

export const TherapyOverview = ({
    userData,
    upcomingSessionData,
}: TherapyDataProps) => {
    const specialist = upcomingSessionData.data?.specialist;
    const session = upcomingSessionData.data?.session;

    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="w-full max-w-3xl">
                <div className="w-full mt-5 mb-20">
                    <h1 className="text-3xl font-bold">הטיפול שלי</h1>
                </div>
                <div className="grid w-full gap-5 grid-cols-1 lg:grid-cols-2 min-h-60">
                    <div className="rounded-md bg-gray-200 min-w-20 flex flex-col justify-between items-center gap-6 p-4">
                        <h1 className="text-rihgt w-full p-0 m-0">
                            פגישה הבאה
                        </h1>
                        {specialist ? (
                            <div className="flex flex-col gap-4 justify-between items-start w-full">
                                <div className=" flex justify-between items-center w-full px-3">
                                    <div className="flex items-center justify-center">
                                        {specialist.photoUrl ? (
                                            <Image
                                                src={specialist.photoUrl}
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
                                    <div className="flex flex-col">
                                        <span>
                                            {specialist.firstName}{" "}
                                            {specialist.lastName}
                                        </span>
                                        <span>
                                            {
                                                PROFESSION_LABELS[
                                                    specialist.profession as Profession
                                                ]
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="flex justify-start items-center gap-2 text-[1rem]">
                                        <span>סוג הפגישה:</span>
                                        <span>
                                            {
                                                MEETING_FORMAT_LABELS[
                                                    session?.meetingFormat as MeetingFormat
                                                ]
                                            }
                                        </span>
                                    </div>
                                    <div className="flex  justify-start items-start  gap-10 text-[1rem]">
                                        <div className="flex  gap-2">
                                            <span>תאריך:</span>
                                            <span>
                                                {formatDateTime(session?.date, {
                                                    mode: "date",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span>שעה:</span>
                                            <span>
                                                {formatDateTime(
                                                    session?.startAt,
                                                    {
                                                        mode: "time",
                                                    },
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-center gap-2 text-[1rem]">
                                        <span>לינק לפגישה:</span>

                                        <span className="">
                                            <Link
                                                href={
                                                    session?.meetingUrl as string
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                {session?.meetingUrl}
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-5 text-center py-4 h-full text-black">
                                {upcomingSessionData.isLoading && (
                                    <div className="flex items-center justify-center gap-2">
                                        <p>טוען פגישות</p>
                                        <Spinner className="size-4" />
                                    </div>
                                )}
                                {!upcomingSessionData.isLoading &&
                                    !upcomingSessionData.isError && (
                                        <p>כרגע אין לך פגישות</p>
                                    )}
                                {upcomingSessionData.isError && (
                                    <p>שגיאה בטעינת הפגישות</p>
                                )}
                                <Link
                                    href="/catalog"
                                    className="py-3 px-4 bg-secondary text-white rounded-lg"
                                >
                                    קבע פגישה חדשה
                                </Link>
                            </div>
                        )}
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
