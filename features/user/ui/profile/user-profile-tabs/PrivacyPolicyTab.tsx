export function PrivacyTab() {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Privacy policy</h3>
            <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                    Your privacy is important to us. This policy outlines how we
                    collect, use, and protect your personal information.
                </p>
                <h4 className="font-semibold mt-4 mb-2">Data Collection</h4>
                <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us...
                </p>
                <h4 className="font-semibold mt-4 mb-2">Data Usage</h4>
                <p className="text-gray-600 mb-4">
                    We use your information to provide and improve our
                    services...
                </p>
            </div>
        </div>
    );
}
