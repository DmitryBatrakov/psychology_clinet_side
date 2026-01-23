import { atom } from 'jotai';
import { UserData } from '../../model/user/user';

export const userAtom = atom<UserData | null>(null);