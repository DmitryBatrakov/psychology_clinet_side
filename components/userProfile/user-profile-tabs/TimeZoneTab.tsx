import { UserProfile } from "@/features/user/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TimeZoneTab({ dbUser }: { dbUser: any }) {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Time zone</h3>
            <select 
                defaultValue={dbUser?.timezone}
                className="w-full p-3 border rounded-lg mb-4"
            >
                <option value="Asia/Jerusalem">GMT+2 (Israel)</option>
                <option value="Europe/London">GMT+1 (Europe)</option>
                <option value="UTC">GMT+0 (UTC)</option>
            </select>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                Save
            </button>
        </div>
    );
}