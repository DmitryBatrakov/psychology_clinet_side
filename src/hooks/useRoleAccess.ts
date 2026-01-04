// hooks/useRoleAccess.ts
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authAtom } from "../store/authAtom";

export function useRoleAccess(allowedRoles: string[]) {
    const { user, role, loading } = useAtomValue(authAtom);
    const router = useRouter();
    
    useEffect(() => {
        if (!loading) {
            if (!user) router.push("/login");
            else if (role && !allowedRoles.includes(role))
                router.push("/unauthorized");
        }
    }, [user, role, loading, router]);

    return { loading, user, role };
}
