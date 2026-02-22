"use client";

import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "../ui/card";

const FAQ_ITEMS = [
    {
        id: "matchmaking",
        question:
            "למה עדיף להשתמש בשירות התאמה אישית ולא לבקש המלצה על מומחה ממכרים?",
        answer:
            "התאמה אישית לוקחת בחשבון את הצורך שלך, פורמט המפגשים המועדף, השפה והתקציב. כך קל ומהיר יותר למצוא מומחה שמתאים בדיוק לך.",
    },
    {
        id: "confidentiality",
        question: "האם כל הפסיכולוגים שומרים על סודיות מלאה?",
        answer:
            "כן. המומחים עובדים לפי כללי אתיקה מקצועיים, ולכן מידע אישי ותוכן המפגשים אינם נחשפים לצד שלישי.",
    },
    {
        id: "reschedule",
        question: "האם אפשר לבטל או לדחות מפגש?",
        answer:
            "כן, בדרך כלל ניתן לבטל או לדחות בהתאם למדיניות של המומחה שנבחר. כל הפרטים מוצגים לפני אישור ההזמנה.",
    },
];

export const Faq = () => {
    return (
        <Card className="w-full">
            <CardHeader className="mb-8 text-center text-2xl font-semibold text-foreground">
                שאלות נפוצות
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {FAQ_ITEMS.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-right">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="pt-4">
                    <Link
                        href="/faq"
                        className="text-sm underline underline-offset-4"
                    >
                        לצפייה בכל השאלות
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
