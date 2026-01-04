"use client";

import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans gap-6">
            <div className="">
                <span className="text-black" >Main page</span>
            </div>
            
        </div>
    );
}
