"use client";
import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { authAtom } from "@/src/store/authAtom";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
    const { user } = useAtomValue(authAtom);
    const { goToLogin, goToProfile } = useAppNavigation();

    return (
        <header className="flex items-center justify-between p-4 ">
            <div className="flex items-center justify-center">
                <span className="font-bold text-2xl">Logo</span>
            </div>
            <nav className="flex gap-4">
                <Link href="/dashboard">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/catalog">Catalog</Link>
            </nav>
            <div className="flex items-center justify-center">
                {user ? (
                    <button 
                        className="p-4 rounded-full border-2 border-black text-sm"
                        onClick={() => goToProfile()}
                        >
                        Avatar
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => goToLogin()}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
};
