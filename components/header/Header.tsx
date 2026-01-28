"use client";
import { authAtom } from "@/src/store/auth/authAtom";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUser } from "lucide-react";

export const Header = () => {
    const { user } = useAtomValue(authAtom);
    const router = useRouter();

    return (
        <header className="flex items-center justify-between p-4 ">
            <div className="flex items-center justify-center">
                <span className="font-bold text-2xl">Logo</span>
            </div>
            <nav className="flex gap-4">
                <Link href="/dashboard">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/catalog">Catalog</Link>
                <Link href="/specialists">For Specialist</Link>
            </nav>
            <div className="flex items-center justify-center">
                {user ? (
                    <button
                        className="cursor-pointer"
                        onClick={() => router.push("/account/profile")}
                    >
                        <CircleUser size={40} color="gray" />
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => router.push("/auth/login")}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};
