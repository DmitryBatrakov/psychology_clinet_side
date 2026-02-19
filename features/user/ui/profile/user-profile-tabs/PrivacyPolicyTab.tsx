export function PrivacyTab() {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">מדיניות פרטיות</h3>
            <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                    הפרטיות שלך חשובה לנו. מדיניות זו מתארת כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.
                </p>
                <h4 className="font-semibold mt-4 mb-2">איסוף נתונים</h4>
                <p className="text-gray-600 mb-4">
                    אנו אוספים מידע שאתה מספק לנו ישירות...
                </p>
                <h4 className="font-semibold mt-4 mb-2">שימוש בנתונים</h4>
                <p className="text-gray-600 mb-4">
                    אנו משתמשים במידע שלך כדי לספק ולשפר את השירותים שלנו...
                </p>
            </div>
        </div>
    );
}
