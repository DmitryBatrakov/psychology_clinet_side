"use client";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export const Header = () => {
    const { user, loading } = useAtomValue(authAtom);
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const isMainPage = pathname === "/";

    const handleAuthClick = () => {
        if (user) {
            router.push("/account/therapy");
        } else {
            router.push("/auth/login");
        }
        setIsMenuOpen(false);
    };

    const handleNavigate = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className={cn(
                "flex items-center justify-between px-4 h-20 max-w-[1920px] w-full mx-auto top-0 left-0 z-30",
                isMainPage ? "absolute" : "relative",
            )}
        >
            <div className="hidden lg:flex items-center justify-between w-full">
                <div className="flex items-center justify-center min-w-40">
                    {loading ? (
                        <div className="w-10 h-10 rounded-full bg-neutral-300 animate-pulse" />
                    ) : user ? (
                        <button onClick={() => router.push("/account/therapy")} className="cursor-pointer">
                            <CircleUser size={40} color="gray" />
                        </button>
                    ) : (
                        <button
                            className="rounded bg-primary px-4 py-2 text-white cursor-pointer"
                            onClick={() => router.push("/auth/login")}
                        >
                            Sign In
                        </button>
                    )}
                </div>

                <nav className="flex items-center gap-10 text-[1.1rem] font-normal [&>a]:transition-colors [&>a:hover]:text-accent">
                    <Link className="hover:text-accent" href="/">
                        עמוד הבית
                    </Link>
                    <Link href="/about">קצת עלינו</Link>
                    <Link href="/catalog">אנשי מקצוע</Link>
                    <Link href="/for-specialists">מידע למטפלים</Link>
                </nav>

                <div className="flex items-center justify-center">
                    <span className="font-bold text-3xl text-foreground">
                        Logo
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between lg:hidden w-full relative">
                <div className="flex items-center justify-center">
                    <span className="font-bold text-3xl text-foreground">
                        Logo
                    </span>
                </div>
                <Drawer
                    open={isMenuOpen}
                    onOpenChange={setIsMenuOpen}
                    direction="left"
                >
                    <DrawerTrigger asChild>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMenuOpen}
                        >
                            <Menu size={24} />
                        </button>
                    </DrawerTrigger>
                    <DrawerContent className="">
                        <DrawerHeader className="flex flex-row items-center justify-between">
                            <DrawerTitle className="text-xl ">Menu</DrawerTitle>
                            <DrawerClose asChild>
                                <X size={20} />
                            </DrawerClose>
                        </DrawerHeader>
                        <div className="px-4 pb-4">
                            <nav className="flex flex-col gap-3">
                                <Link href="/" onClick={handleNavigate}>
                                    עמוד הבית
                                </Link>
                                <Link href="/about" onClick={handleNavigate}>
                                    קצת עלינו
                                </Link>
                                <Link href="/catalog" onClick={handleNavigate}>
                                    אנשי מקצוע
                                </Link>
                                <Link
                                    href="/specialists"
                                    onClick={handleNavigate}
                                >
                                    מידע למטפלים
                                </Link>
                            </nav>
                            <div className="mt-4">
                                {!loading && (
                                    <button
                                        className="w-full rounded bg-primary px-4 py-2 text-white"
                                        onClick={handleAuthClick}
                                    >
                                        {user ? "פרופיל" : "התחברות"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    );
};
