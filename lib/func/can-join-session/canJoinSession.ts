const JOIN_WINDOW_MINUTES = 15;

export function canJoinSession(startAt: string | Date): boolean {
    const start = new Date(startAt);
    const now = new Date();
    const diffMs = start.getTime() - now.getTime();
    const diffMinutes = diffMs / 1000 / 60;
    return diffMinutes <= JOIN_WINDOW_MINUTES && diffMinutes > -60;
}

export function getJoinBlockReason(startAt: string | Date): string | null {
    const start = new Date(startAt);
    const now = new Date();
    const diffMs = start.getTime() - now.getTime();
    const diffMinutes = diffMs / 1000 / 60;

    if (diffMinutes > JOIN_WINDOW_MINUTES) {
        return `ניתן להתחבר לא יותר מ-${JOIN_WINDOW_MINUTES} דקות לפני תחילת הפגישה`;
    }
    return null;
}
