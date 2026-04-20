export default function PatientViewLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen max-w-6xl mx-auto p-4">
            <main>{children}</main>
        </div>
    )
}