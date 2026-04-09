import { Footer } from "@/components/footer/Footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="">{children}</div>
            <Footer />
        </div>
    );
}
