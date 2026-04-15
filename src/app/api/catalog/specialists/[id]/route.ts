import { adminDb } from "@/src/server/firebase/admin";
import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import type { SpecialistDTO } from "@/features/specialist/model/types";
import { getServiceLabel } from "@/features/catalog/model/serviceTopics";

function toIsoString(value: unknown): string {
    if (value instanceof Timestamp) return value.toDate().toISOString();
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") return value;
    return "";
}

function toSpecialistDTO(
    docId: string,
    data: FirebaseFirestore.DocumentData,
): SpecialistDTO {
    const dto = {
        id: docId,
        firstName: String(data.firstName ?? ""),
        lastName: String(data.lastName ?? ""),
        phoneNumber: String(data.phoneNumber ?? ""),
        photoUrl: data.photoUrl == null ? null : String(data.photoUrl),
        birthDate: toIsoString(data.birthDate),
        gender: (data.gender === "male" ? "male" : "female") as "male" | "female",
        languages: Array.isArray(data.languages) ? data.languages : [],
        profession:
            data.profession === "therapist" || data.profession === "coach"
                ? data.profession
                : "psychologist",
        sessionTypes: Array.isArray(data.sessionTypes) ? data.sessionTypes : [],
        experience: Number(data.experience ?? 0),
        pricePerSession: Number(data.pricePerSession ?? 0),
        services: Array.isArray(data.services) ? data.services : [],
        about: typeof data.about === "string" ? data.about : "",
        workMethods: typeof data.workMethods === "string" && data.workMethods
            ? [data.workMethods]
            : Array.isArray(data.workMethods) ? data.workMethods : [],
        values: typeof data.values === "string" ? data.values : "",
        mainDegree: data.mainDegree && typeof data.mainDegree === "object"
            ? data.mainDegree
            : { degreeName: "", description: "" },
        additionalDegrees: Array.isArray(data.additionalDegrees) ? data.additionalDegrees : [],
    };

    return dto;
}

export async function GET(
    _req: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { error: "Specialist id is required" },
                { status: 400 },
            );
        }

        const specialistDoc = await adminDb
            .collection("specialists")
            .doc(id)
            .get();
        if (!specialistDoc.exists) {
            return NextResponse.json(
                { error: "Specialist not found" },
                { status: 404 },
            );
        }

        const specialist = toSpecialistDTO(
            specialistDoc.id,
            specialistDoc.data()!,
        );
        const serviceLabels = Object.fromEntries(
            specialist.services.map((service) => [
                service,
                getServiceLabel(service),
            ]),
        );
        return NextResponse.json({ ...specialist, serviceLabels });
    } catch (error) {
        console.error("[GET /api/catalog/specialists/:id]", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
