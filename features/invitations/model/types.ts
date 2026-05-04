import { Timestamp } from "firebase/firestore";

export interface Invitation {
    email: string;
    specialistId: string;
    status: "pending" | "accepted";
    createdAt: Timestamp;
    expiresAt: Timestamp;
    acceptedAt?: Timestamp;
    acceptedUid?: string;
}
