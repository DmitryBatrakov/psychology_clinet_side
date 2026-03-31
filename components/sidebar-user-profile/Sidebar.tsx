"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserPen, BriefcaseBusiness, CreditCard, Settings, Mail, LogOut, BookHeart} from "lucide-react";
import { logout } from "@/features/auth/hooks/useLogout";

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
            icon: <BookHeart size={20} />,
        },
        {
            name: "הפגישות שלי",
            href: "/account/activity",
            icon: <CreditCard size={20} />,
        },
        {
            name: "מטפלים",
            href: "/catalog",
            icon: <BriefcaseBusiness size={20} />,
        },
        {
            name: "פרופיל",
            href: "/account/profile",
            icon: <UserPen size={20} />,
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
        <aside className="w-64 bg-primary text-foreground p-4 flex h-full flex-col justify-between min-h-[calc(100vh-80px)]" dir="rtl">
            <nav className="flex flex-col gap-3 mt-20">
                {menuItems.map((item) => (
                    <div key={item.href} className="flex items-center justify-center">
                        <Link
                            href={item.href}
                            className={`p-3 rounded-xl flex gap-4 items-center w-full ${
                                pathname === item.href
                                    ? "bg-foreground text-white font-medium justify-center hover:"
                                    : "hover:bg-white/20"
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
                    className="text-foreground bg-accent p-3 rounded-xl hover:bg-primary-foreground cursor-context-menu"
                    onClick={handlLogout}
                >
                    <LogOut size={30} />
                </button>
            </div>
        </aside>
    );
};
