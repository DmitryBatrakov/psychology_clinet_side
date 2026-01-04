'use client'

import { useAppNavigation } from "@/src/hooks/useAppNavigation";
import { useAuthActions } from "@/src/hooks/useAuthActions";

export default function Profile() {

    const { goBack } = useAppNavigation();
    const { logout } = useAuthActions();

    return (
        <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
                onClick={() => goBack()}
            >
                Back
            </button>
            <span>Profile page</span>
            <button
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
                onClick={logout} 
            >
                Logout
            </button>

        </div>
    );
}
