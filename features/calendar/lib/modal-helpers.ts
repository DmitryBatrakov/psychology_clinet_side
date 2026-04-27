import { UserProfile } from "@/features/user/model/types";

export const OFFSET_X = 20;
export const OFFSET_Y = 12;
export const MODAL_WIDTH = 520;
export const SCREEN_MARGIN = 15;

export type ClientOption = Pick<UserProfile, 'uid' | 'firstName' | 'lastName' | 'phoneNumber' | 'photoUrl'>;

export const MOCK_CLIENTS: ClientOption[] = [
    { uid: '1', firstName: 'שרה', lastName: 'כהן', phoneNumber: '050-123-4567', photoUrl: null },
    { uid: '2', firstName: 'דוד', lastName: 'לוי', phoneNumber: '052-987-6543', photoUrl: null },
    { uid: '3', firstName: 'מירב', lastName: 'אברהם', phoneNumber: '054-111-2233', photoUrl: null },
    { uid: '4', firstName: 'יוסף', lastName: 'מזרחי', phoneNumber: '053-444-5566', photoUrl: null },
    { uid: '5', firstName: 'רחל', lastName: 'פרץ', phoneNumber: '058-777-8899', photoUrl: null },
];

export const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase();

export const formatHeDate = (date: Date) =>
    date.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' });
