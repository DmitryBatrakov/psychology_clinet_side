import { SessionType } from '@/features/specialist/model/types';

type SessionColors = { bg: string; header: string; accent: string };

const SESSION_COLORS: Record<SessionType, SessionColors> = {
    individual: { bg: '#C7D2FE', header: '#818CF8', accent: '#4F46E5' },
    couple:     { bg: '#A7F3D0', header: '#34D399', accent: '#059669' },
    child:      { bg: '#FED7AA', header: '#FB923C', accent: '#EA580C' },
    teen:       { bg: '#DDD6FE', header: '#A78BFA', accent: '#9333EA' },
};

export function getSessionColor(type: SessionType): SessionColors {
    return SESSION_COLORS[type];
}
