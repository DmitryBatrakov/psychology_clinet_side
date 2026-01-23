

import { Sidebar } from "@/components/sidebar-user-profile/Sidebar";
// import { useEffect } from "react";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // useEffect(() => {

    // })


    return (
        <div className="flex flex-1 bg-slate-50" dir="rtl">
            <Sidebar />

            <main className="flex-1 p-8 ">{children}</main>
        </div>
    );
}
