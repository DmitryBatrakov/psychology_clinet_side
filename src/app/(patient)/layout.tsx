import { openSans } from "@/lib/fonts";
import { Header } from '../../../components/header/Header';

export default function PatientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${openSans.className} flex flex-col min-h-screen`}>
            <Header />
            <div className="">{children}</div>
        </div>
    );
}
