"use client";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export const Header = () => {
    const { user } = useAtomValue(authAtom);
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <header className="flex items-center justify-between px-4 h-20 max-w-[1920px] w-full mx-auto">
            <div className="flex items-center justify-center">
                <span className="font-bold text-3xl text-foreground">Logo</span>
            </div>

            <nav className="hidden items-center gap-10 md:flex text-[1.2rem] font-normal [&>a]:transition-colors [&>a:hover]:text-accent">
                <Link className="hover:text-accent" href="/">עמוד הבית</Link>
                <Link href="/about">קצת עלינו</Link>
                <Link href="/catalog">אנשי מקצוע</Link>
                <Link href="/specialists">מידע למטפלים</Link>
            </nav>

            <div className="hidden items-center justify-center md:flex">
                {user ? (
                    <button
                        className="cursor-pointer"
                        onClick={() => router.push("/account/therapy")}
                        aria-label="Open profile"
                    >
                        <CircleUser size={40} color="gray" />
                    </button>
                ) : (
                    <button
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                        onClick={() => router.push("/auth/login")}
                    >
                        Sign In
                    </button>
                )}
            </div>

            <Drawer
                open={isMenuOpen}
                onOpenChange={setIsMenuOpen}
                direction="right"
            >
                <DrawerTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        <Menu size={24} />
                    </button>
                </DrawerTrigger>
                <DrawerContent className="md:hidden">
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <DrawerTitle className="text-xl ">Menu</DrawerTitle>
                        <DrawerClose asChild>
                            <X size={20} />
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                        <nav className="flex flex-col gap-3">
                            <Link href="/dashboard" onClick={handleNavigate}>
                                Home
                            </Link>
                            <Link href="/about" onClick={handleNavigate}>
                                About
                            </Link>
                            <Link href="/catalog" onClick={handleNavigate}>
                                Catalog
                            </Link>
                            <Link href="/specialists" onClick={handleNavigate}>
                                For Specialist
                            </Link>
                        </nav>
                        <div className="mt-4">
                            <button
                                className="w-full rounded bg-blue-500 px-4 py-2 text-white"
                                onClick={handleAuthClick}
                            >
                                {user ? "Profile" : "Sign In"}
                            </button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </header>
    );
};
