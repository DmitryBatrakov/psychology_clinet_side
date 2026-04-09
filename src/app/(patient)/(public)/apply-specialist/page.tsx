import { FormApplication } from "@/features/specialist-application/ui/FormApplication";

export default function ApplyPage() {
    return (
        <div className="min-h-screen-safe w-full flex flex-col gap-20 items-center justify-center p-5">
            <h1>Apply Page</h1>
            <div className="w-full max-w-6xl mx-auto flex items-center justify-center">
                <FormApplication />
            </div>
        </div>
    )
}