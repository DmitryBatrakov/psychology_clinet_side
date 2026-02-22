import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_PAGE_ITEMS = [
    {
        id: "matchmaking-benefit",
        question:
            "למה עדיף להשתמש בשירות התאמה אישית במקום לחפש מומחה לבד?",
        answer:
            "התאמה אישית מתחשבת בצורך שלך, בפורמט המפגש, בשפה, בתקציב ובהעדפות. זה מפחית את הסיכוי לבחירה לא מתאימה וחוסך זמן.",
    },
    {
        id: "confidentiality",
        question: "האם כל המומחים שומרים על סודיות מלאה?",
        answer:
            "כן, העבודה מתבצעת לפי עקרונות אתיקה מקצועית: מידע אישי ותוכן המפגשים אינם מועברים לצד שלישי.",
    },
    {
        id: "cancel-reschedule",
        question: "האם אפשר לבטל או לדחות פגישה?",
        answer:
            "כן, בהתאם למדיניות של המומחה שנבחר. תנאי הביטול והדחייה מוצגים לפני אישור ההזמנה.",
    },
    {
        id: "first-session",
        question: "מה בדרך כלל קורה בפגישה הראשונה?",
        answer:
            "במפגש הראשון מחדדים את הצורך שלך, מכירים את הגישה של המומחה ומגדירים תוכנית עבודה להמשך.",
    },
    {
        id: "how-to-choose",
        question: "איך להבין שהמומחה מתאים לי?",
        answer:
            "שימי לב לתחושת הביטחון, לבהירות התקשורת ולהתקדמות אחרי כמה מפגשים. אם צריך, אפשר להחליף מומחה.",
    },
    {
        id: "session-duration",
        question: "כמה זמן נמשכת פגישה אחת?",
        answer:
            "משך מפגש סטנדרטי הוא בדרך כלל כ-50 דקות, אך ייתכנו הבדלים קלים לפי הפורמט ושיטת העבודה של המומחה.",
    },
    {
        id: "online-offline",
        question: "האם יש הבדל בין פגישות אונליין לפגישות פרונטליות?",
        answer:
            "שני הפורמטים יעילים. אונליין נותן גמישות וחיסכון בזמן, ופרונטלי מאפשר יותר קשר אישי. הבחירה תלויה בנוחות שלך.",
    },
    {
        id: "how-fast-results",
        question: "מתי אפשר לצפות לתוצאות הראשונות?",
        answer:
            "לעיתים ניתן להרגיש שינוי כבר אחרי כמה מפגשים, אבל תוצאה יציבה תלויה בצורך, בהתמדה וברמת המעורבות בתהליך.",
    },
    {
        id: "specialist-change",
        question: "מה לעשות אם המומחה לא מתאים לי?",
        answer:
            "זו סיטואציה טבעית. אפשר לסיים את התהליך ולבחור מומחה אחר שמתאים יותר לצורך שלך.",
    },
    {
        id: "payment",
        question: "איך מתבצע התשלום על הייעוצים?",
        answer:
            "התשלום מתבצע לפי תנאי הפלטפורמה והמומחה שנבחר. כל הפרטים על מחיר וכללים מוצגים לפני קביעת הפגישה.",
    },
];

export default function FaqPage() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-12" dir="rtl">
            <h1 className="mb-8 text-center text-4xl font-semibold text-foreground">
                שאלות נפוצות
            </h1>
            <div className="space-y-2">
                <Separator />
                <Accordion type="multiple"  className="w-full">
                    {FAQ_PAGE_ITEMS.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-right text-lg leading-7">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}