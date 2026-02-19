"use client";

import { DeleteAccountModal } from "@/components/modal/DeleteAccountModal";

export default function Settings() {
    return (
        <div className="flex items-center justify-between  w-full">
            <div className=" w-4/5  flex items-center justify-center ">
                <span>דף הגדרות</span>
                <div className="space-y-6">
                    {/* profile */}
                    <DeleteAccountModal />
                </div>
            </div>
        </div>
    );
}
