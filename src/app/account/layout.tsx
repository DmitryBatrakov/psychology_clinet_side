import { Sidebar } from "@/components/sidebar-user-profile/Sidebar";
import { BottomNav } from "@/components/bottom-nav/BottomNav";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="flex w-full mx-auto items-start justify-between h-full"
            dir="rtl"
        >
            <div className="flex w-full items-start justify-between h-full">
                <Sidebar />

                <div className="flex-1 p-5 overflow-y-auto max-h-[calc(100vh-80px)] pb-20 md:pb-5">
                    {children}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
