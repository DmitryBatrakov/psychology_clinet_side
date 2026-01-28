"use client";

import { DeleteAccountModal } from "@/components/modal/DeleteAccountModal";

export default function Settings() {
    return (
        <div className="flex items-center justify-between  w-full">
            <div className=" w-4/5  flex items-center justify-center ">
                <span>Settings page</span>
                <div className="space-y-6">
                    {/* профиль */}
                    <DeleteAccountModal />
                </div>
            </div>
        </div>
    );
}
