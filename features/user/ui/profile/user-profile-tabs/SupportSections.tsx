export function SupportTab() {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">תמיכה</h3>
            <div className="space-y-4">
                <p className="text-gray-600">
                    צריכים עזרה? צרו קשר עם צוות התמיכה:
                </p>
                <div className="space-y-2">
                    <p><strong>אימייל:</strong> support@example.com</p>
                    <p><strong>טלפון:</strong> +1 (555) 123-4567</p>
                    <p><strong>שעות פעילות:</strong> 9:00–18:00</p>
                </div>
            </div>
        </div>
    );
}
