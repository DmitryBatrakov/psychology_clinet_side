export default function PatientViewLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <main>{children}</main>
        </div>
    )
}