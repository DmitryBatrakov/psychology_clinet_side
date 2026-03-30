import { Sidebar } from "@/components/sidebar-user-profile/Sidebar";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-1 bg-slate-50 max-w-[1920px] w-full mx-auto items-start justify-between" dir="rtl">
            <Sidebar />

            <main className="flex-1 p-5 ">{children}</main>
        </div>
    );
}
