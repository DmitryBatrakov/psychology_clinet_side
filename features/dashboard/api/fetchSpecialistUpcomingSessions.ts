import { auth } from '@/lib/firebase';
import type { ScheduleDayItem } from '@/features/dashboard/model/types';
import { upcomingSessionsMock } from '@/features/dashboard/mockData/upcomingSessionsMock';

const DAYS_AHEAD = 7;

export async function fetchSpecialistUpcomingSessions(): Promise<{ items: ScheduleDayItem[] }> {
    // SWAP POINT: remove mock block and uncomment real fetch below
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + DAYS_AHEAD);
    cutoff.setHours(23, 59, 59, 999);

    const items = upcomingSessionsMock.items.filter(
        ({ session }) => new Date(session.startAt) <= cutoff,
    );
    return { items };

    // const user = auth.currentUser;
    // if (!user) throw new Error('User not authenticated');
    // const idToken = await user.getIdToken();
    // const res = await fetch(`/api/specialist/sessions/upcoming?days=${DAYS_AHEAD}`, {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${idToken}` },
    // });
    // const json = await res.json().catch(() => null);
    // if (!res.ok) throw new Error(json?.error ?? 'Failed to load sessions');
    // if (!json) throw new Error('Invalid response format');
    // return json;
}
