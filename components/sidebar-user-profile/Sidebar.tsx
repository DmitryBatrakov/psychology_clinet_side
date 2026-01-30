"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserPen, BriefcaseBusiness, CreditCard, Settings, Mail, LogOut } from "lucide-react";
import { logout } from "@/features/auth/hooks";

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handlLogout = async () => {
        try {
            await logout();
            router.replace("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const menuItems = [
        {
            name: "טיפול שלי",
            href: "/account/therapy",
            icon: <UserPen size={20} />,
        },
        {
            name: "הפרופיל שלי",
            href: "/account/profile",
            icon: <UserPen size={20} />,
        },
        {
            name: "מומחה",
            href: "/account/specialist",
            icon: <BriefcaseBusiness size={20} />,
        },
        {
            name: "תשלומים ופגישות",
            href: "/account/billing",
            icon: <CreditCard size={20} />,
        },
        {
            name: "הגדרות",
            href: "/account/settings",
            icon: <Settings size={20} />,
        },
        {
            name: "צור קשר",
            href: "/account/contactUs",
            icon: <Mail size={20} />,
        },
    ];

    return (
        <aside className="w-64 bg-blue-500 text-white p-4 flex h-full flex-col justify-between" dir="rtl">
            <nav className="flex flex-col gap-3 mt-20">
                {menuItems.map((item) => (
                    <div key={item.href} className="flex items-center justify-center">
                        <Link
                            href={item.href}
                            className={`p-3 rounded-xl flex gap-4 items-center w-full ${
                                pathname === item.href
                                    ? "bg-white text-blue-600 font-medium justify-center hover:"
                                    : "hover:bg-white/10"
                            }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </div>
                ))}
            </nav>
            <div className="w-full flex justify-center items-center mb-10 ">
                <button
                    className="text-white bg-white/15 p-2 rounded-xl hover:bg-white/25 cursor-context-menu"
                    onClick={handlLogout}
                >
                    <LogOut size={30} />
                </button>
            </div>
        </aside>
    );
};
