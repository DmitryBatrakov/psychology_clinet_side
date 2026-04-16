import type { WorkMethod } from "@/features/specialist/model/types";

export const WORK_METHOD_LABELS: Record<WorkMethod, string> = {
    CBT: "טיפול קוגניטיבי-התנהגותי (CBT)",
    "Schema Therapy": "טיפול סכמה",
    Psychoanalysis: "פסיכואנליזה",
    "Gestalt Therapy": "טיפול גשטלט",
    "Systemic Family Therapy": "טיפול משפחתי סיסטמי",
    "Positive Therapy": "פסיכולוגיה חיובית",
    Coaching: "קואצ'ינג",
    "Transactional Analysis": "אנליזה טרנזקציונלית",
    "Brief Strategic Therapy": "טיפול אסטרטגי קצר מועד",
    "Client-Centered Therapy": "טיפול ממוקד לקוח",
    "Body-Oriented Therapy": "טיפול גוף-נפש",
    "Psychodynamic Therapy": "טיפול פסיכודינמי",
    "Neuropsychological Therapy": "טיפול נוירופסיכולוגי",
};
