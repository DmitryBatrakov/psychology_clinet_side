"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BookHeart,
    CreditCard,
    BriefcaseBusiness,
    UserPen,
    Settings,
    Mail,
    LogOut,
    MoreHorizontal,
    X,
} from "lucide-react";
import { logout } from "@/features/auth/hooks/useLogout";
import { useState } from "react";

const mainItems = [
    { name: "טיפול", href: "/account/therapy", icon: BookHeart },
    { name: "פגישות", href: "/account/activity", icon: CreditCard },
    { name: "מטפלים", href: "/catalog", icon: BriefcaseBusiness },
    { name: "פרופיל", href: "/account/profile", icon: UserPen },
];

const moreItems = [
    { name: "הגדרות", href: "/account/settings", icon: Settings },
    { name: "צור קשר", href: "/account/contactUs", icon: Mail },
];

export function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/session-cookies/logout", { method: "POST" });
            await logout();
            router.replace("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <>
            {/* More popup */}
            {isMoreOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 z-40"
                        onClick={() => setIsMoreOpen(false)}
                    />

                    {/* Popup */}
                    <div
                        dir="rtl"
                        className="md:hidden fixed bottom-18 left-3 z-50 bg-primary text-foreground rounded-md shadow-xl border border-white/10 py-2 min-w-[180px]"
                    >
                        <div className="flex items-center justify-between px-4 py-1 mb-1 border-b border-white/10">
                            <span className="text-xs text-foreground/50">עוד</span>
                            <button onClick={() => setIsMoreOpen(false)}>
                                <X size={16} className="text-foreground/50" />
                            </button>
                        </div>

                        {moreItems.map(({ name, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMoreOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
                                    pathname === href ? "text-accent font-medium" : "text-foreground/80"
                                }`}
                            >
                                <Icon size={18} />
                                <span>{name}</span>
                            </Link>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-sm w-full text-foreground/80 hover:bg-white/10 transition-colors border-t border-white/10 mt-1"
                        >
                            <LogOut size={18} />
                            <span>יציאה</span>
                        </button>
                    </div>
                </>
            )}

            {/* Bottom bar */}
            <nav
                dir="rtl"
                className="md:hidden fixed bottom-0 right-0 left-0 z-40 bg-primary text-foreground border-t border-white/10 flex items-center justify-around px-1 h-16"
            >
                {mainItems.map(({ name, href, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[10px] transition-colors ${
                                isActive
                                    ? "text-accent font-semibold"
                                    : "text-foreground/60 hover:text-foreground"
                            }`}
                        >
                            <Icon size={20} />
                            <span>{name}</span>
                        </Link>
                    );
                })}

                {/* More button */}
                <button
                    onClick={() => setIsMoreOpen((prev) => !prev)}
                    className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[10px] transition-colors cursor-pointer ${
                        isMoreOpen ? "text-accent" : "text-foreground/60 hover:text-foreground"
                    }`}
                >
                    <MoreHorizontal size={20} />
                    <span>עוד</span>
                </button>
            </nav>
        </>
    );
}
