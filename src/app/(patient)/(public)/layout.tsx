import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="">{children}</div>
            <Footer />
        </div>
    );
}
