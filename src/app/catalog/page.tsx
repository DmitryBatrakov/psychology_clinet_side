export default function Catalog() {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4" dir="rtl">
            <h1 className="text-2xl font-bold text-right mb-5">Catalog</h1>
            <div className="grid grid-cols-3 gap-5 w-full">
                <div className="col-span-1 border border-blue-500">
                    Sort section
                </div>
                <div className="col-span-2 border border-green-500 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    Catalog section
                </div>
            </div>
        </div>
    );
}
