/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProfile } from "@/features/user/types";

export function PersonalInfoTab({ dbUser }: { dbUser: any }) {
    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold mb-4">Edit profile</h3>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        defaultValue={dbUser?.firstName}
                        placeholder="Name"
                        className="w-full p-3 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        defaultValue={dbUser?.email}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Phone
                    </label>
                    <input
                        defaultValue={dbUser?.phone}
                        placeholder="Phone"
                        className="w-full p-3 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
