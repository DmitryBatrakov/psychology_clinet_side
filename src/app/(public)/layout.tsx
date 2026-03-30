import { Footer } from "@/components/footer/Footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-[1920px] w-full mx-auto">{children}</div>
            <Footer />
        </div>
    );
}
