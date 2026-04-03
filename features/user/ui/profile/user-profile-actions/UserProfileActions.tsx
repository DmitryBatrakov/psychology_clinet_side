"use client";

import { useUserData } from "@/features/user/hooks/useUserData";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { EditSummaryTab } from "../user-profile-tabs/EditSummaryTab";
import { TimeZoneTab } from "../user-profile-tabs/TimeZoneTab";
import { SupportTab } from "../user-profile-tabs/SupportSections";
import { PrivacyTab } from "../user-profile-tabs/PrivacyPolicyTab";

const menuItems = [
    {
        title: "עריכת פרופיל",
        section: "personal-info",
    },
    {
        title: "אזור זמן",
        section: "time-zone",
    },
    {
        title: "תמיכה",
        section: "support",
    },
    {
        title: "כללי מדיניות פרטיות",
        section: "privacy-policy",
    },
] as const;

export const UserProfileActions = () => {
    const { user, loading: authLoading } = useAtomValue(authAtom);
    const uid = user?.uid ?? null;
    const { data: dbUser } = useUserData(uid, authLoading);

    const searchParams = useSearchParams();
    const router = useRouter();
    const section = searchParams.get("section");

    if (section) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <button
                        onClick={() => router.push("/account/profile")}
                        className="mb-4 text-blue-500 flex items-center gap-2 hover:text-blue-600"
                    >
                        ← חזרה לפרופיל
                    </button>

                    {section === "personal-info" && (
                        <EditSummaryTab dbUser={dbUser} />
                    )}
                    {section === "time-zone" && <TimeZoneTab dbUser={dbUser} />}
                    {section === "support" && <SupportTab />}
                    {section === "privacy-policy" && <PrivacyTab />}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
                <h2 className="py-3 -mr-1 font-bold text-gray-700">
                    הגדרות פרופיל
                </h2>
                <div className="rounded-lg overflow-hidden">
                    {menuItems.map((item) => (
                        <div
                            key={item.section}
                            className="border-b last:border-b-0 w-full"
                        >
                            <button
                                onClick={() =>
                                    router.push(
                                        `/account/profile?section=${item.section}`,
                                    )
                                }
                                className="flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 w-full text-left"
                            >
                                <div>{item.title}</div>
                                <div>
                                    <MdOutlineKeyboardArrowLeft />
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
