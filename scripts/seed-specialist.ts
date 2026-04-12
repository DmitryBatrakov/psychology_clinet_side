import * as dotenv from "dotenv";
dotenv.config();

import * as admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
let privateKey = process.env.FIREBASE_PRIVATE_KEY!;
privateKey = privateKey.replace(/\\n/g, "\n");

admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
});

const auth = admin.auth();
const db = admin.firestore();

const SPECIALIST_UID = "o3FrozdLfycefrqL42agXseoeWu1";

// Тестовый пациент (создадим одного для всех сессий)
const PATIENT_UID = "test-patient-001";

function dayTimestamp(offsetDays: number, hour: number, minute = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    d.setHours(hour, minute, 0, 0);
    return admin.firestore.Timestamp.fromDate(d);
}

async function main() {
    // 1. Установить роль specialist в custom claims
    await auth.setCustomUserClaims(SPECIALIST_UID, { role: "specialist" });
    console.log("✓ Custom claim role=specialist установлен");

    // 2. Обновить поле role в документе users/{uid}
    await db.collection("users").doc(SPECIALIST_UID).set(
        { role: "specialist" },
        { merge: true }
    );
    console.log("✓ users doc обновлён");

    // 3. Убедиться что тестовый пациент существует
    await db.collection("users").doc(PATIENT_UID).set(
        {
            firstName: "Иван",
            lastName: "Тестов",
            photoUrl: null,
            role: "patient",
        },
        { merge: true }
    );
    console.log("✓ Тестовый пациент создан");

    // 4. Создать сессии
    const batch = db.batch();

    const sessions: {
        offsetDays: number;
        hour: number;
        status: "upcoming" | "completed";
    }[] = [
        // Прошедшие (вчера)
        { offsetDays: -1, hour: 9,  status: "completed" },
        { offsetDays: -1, hour: 11, status: "completed" },
        { offsetDays: -1, hour: 13, status: "completed" },
        { offsetDays: -1, hour: 15, status: "completed" },
        { offsetDays: -1, hour: 17, status: "completed" },
        // Сегодня
        { offsetDays: 0, hour: 9,  status: "upcoming" },
        { offsetDays: 0, hour: 11, status: "upcoming" },
        { offsetDays: 0, hour: 13, status: "upcoming" },
        { offsetDays: 0, hour: 15, status: "upcoming" },
        { offsetDays: 0, hour: 17, status: "upcoming" },
        // Завтра
        { offsetDays: 1, hour: 9,  status: "upcoming" },
        { offsetDays: 1, hour: 11, status: "upcoming" },
        { offsetDays: 1, hour: 13, status: "upcoming" },
        { offsetDays: 1, hour: 15, status: "upcoming" },
        { offsetDays: 1, hour: 17, status: "upcoming" },
    ];

    for (const s of sessions) {
        const ref = db.collection("sessions").doc();
        const startAt = dayTimestamp(s.offsetDays, s.hour);
        const endAt = dayTimestamp(s.offsetDays, s.hour + 1);
        batch.set(ref, {
            specialistId: SPECIALIST_UID,
            userId: PATIENT_UID,
            startAt,
            endAt,
            date: startAt,
            status: s.status,
            meetingFormat: "online",
            meetingUrl: "https://meet.google.com/test-link",
            income: 200,
            desription: "Тестовая сессия",
            createdAt: new Date().toISOString(),
        });
    }

    await batch.commit();
    console.log("✓ 15 сессий создано (5 вчера, 5 сегодня, 5 завтра)");

    process.exit(0);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
