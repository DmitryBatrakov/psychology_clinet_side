import Link from "next/link";
import { Facebook, Instagram, Send } from "lucide-react";

const footerLinkClass =
    "text-sm text-violet-200/80 transition-colors hover:text-white";

export const Footer = () => {
    return (
        <footer className="mt-auto bg-[#2B1F4A] text-violet-100" dir="rtl">
            <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-12">
                <div className="space-y-4 w-full">
                    <div className="inline-flex h-10 w-24 items-center justify-center rounded-md border border-violet-300/40 text-sm font-semibold text-white">
                        LOGO
                    </div>
                    <p className="max-w-56 text-sm text-violet-200/80">
                        שירות להתאמה אישית של פסיכולוגים וטיפול נוח אונליין.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-white">
                                דפים נוספים
                            </h3>
                            <div className="flex flex-col gap-2">
                                <Link href="/blog" className={footerLinkClass}>
                                    בלוג
                                </Link>
                                <Link href="/about" className={footerLinkClass}>
                                    אודות
                                </Link>
                                <Link
                                    href="/for-specialist"
                                    className={footerLinkClass}
                                >
                                    למומחים
                                </Link>
                                <Link href="/contact" className={footerLinkClass}>
                                    יצירת קשר
                                </Link>
                                <Link
                                    href="/privacy-policy"
                                    className={footerLinkClass}
                                >
                                    מדיניות פרטיות
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">
                            על השירות
                        </h3>
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/account/contactUs"
                                className={footerLinkClass}
                            >
                                צור קשר
                            </Link>
                            <Link href="/faq" className={footerLinkClass}>
                                שאלות נפוצות
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">דפים</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/catalog" className={footerLinkClass}>
                                קטלוג
                            </Link>
                            <Link
                                href="/account/therapy"
                                className={footerLinkClass}
                            >
                                טיפול
                            </Link>
                            <Link
                                href="/account/profile"
                                className={footerLinkClass}
                            >
                                פרופיל
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white">
                            צרו קשר
                        </h3>
                        <a
                            href="mailto:info@mentoly.com"
                            className={footerLinkClass}
                        >
                            info@mentoly.com
                        </a>
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="פייסבוק"
                                className="text-violet-200/80 transition-colors hover:text-white"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="אינסטגרם"
                                className="text-violet-200/80 transition-colors hover:text-white"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="טלגרם"
                                className="text-violet-200/80 transition-colors hover:text-white"
                            >
                                <Send size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
