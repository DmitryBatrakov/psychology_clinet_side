import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { UserData } from "@/src/model/user/user";

export type DbUser = UserData & { id: string };

export const fetchDbUser = async (uid: string): Promise<DbUser | null> => {
    const snap = await getDoc(doc(db, "users", uid));
    if (!snap.exists()) return null;

    return { id: snap.id, ...(snap.data() as UserData) };
};


