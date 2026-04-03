import Link from "next/link";


export default function SpecialistsPage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 ">
            <div className="w-full h-52 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-right mb-5">Specialists</h1>
            </div>
            <div>
                <Link href="/apply-specialist" className="text-blue-500 bg-blue-500/10 px-4 py-2 rounded-md hover:bg-blue-500/30">Apply to be a specialist</Link>
            </div>
        </div>
    )
}