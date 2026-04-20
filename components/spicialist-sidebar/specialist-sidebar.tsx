'use client'
import { logout } from "@/features/auth/hooks/useLogout";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SpecialistSidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const handlLogout = async () => {
        try {
            await fetch("/api/auth/session-cookies/logout", { method: "POST" });
            await logout();
            router.replace("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const menuItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Avtivity", href: "/activity" },
        { label: "Calendar", href: "/calendar" },
        { label: "Inbox", href: "/inbox" },
        { label: "Clients", href: "/clients" },
    ]

    return (
        <aside
            dir="rtl"
            className="hidden lg:flex min-w-56 bg-primary text-foreground p-4 h-full flex-col justify-between min-h-screen shadow-[inset_0_0_15px_0] shadow-black/50 rounded-l-2xl"
        >
            <div className="flex flex-col gap-5 ">
                <p className="text-[2rem] font-bold ">Logo</p>
                <nav className="flex flex-col gap-3 mt-20">
                    {menuItems.map((item) => (
                        <div key={item.href} className="flex items-center justify-center">
                            <Link
                                href={item.href}
                                className={`p-3 rounded-xl flex gap-4 items-center w-full ${pathname === item.href
                                        ? "bg-foreground text-white font-medium justify-center"
                                        : "hover:bg-white/20"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
            <div className="w-full flex justify-center items-center mb-10">
                <button
                    className="text-foreground bg-accent p-3 rounded-xl hover:bg-primary-foreground cursor-pointer"
                    onClick={handlLogout}
                >
                    <LogOut size={30} />
                </button>
            </div>
        </aside>
    );
};
