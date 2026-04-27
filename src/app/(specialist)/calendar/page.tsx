'use client';
import DayTab from '@/features/calendar/ui/day-tab';
import { getMiddleDate } from '@/features/calendar/lib/halpers';
import ListTab from '@/features/calendar/ui/list-tab';
import MonthTab from '@/features/calendar/ui/month-tab';
import WeekTab from '@/features/calendar/ui/week-tab';
import Widget from '@/components/blocks/widgets/widget';
import { Button } from '@/components/ui/button';
import { ItemHeader } from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    getDaysInMonth,
    getTime,
    parse,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { toDateKey } from '@/lib/func/to-date-key/toDateKey';
import { Schedule, VisitRecord } from '@/features/calendar/model/types';
export type { Schedule, VisitRecord } from '@/features/calendar/model/types';
import { he } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, Suspense, useCallback, useMemo, useState } from 'react';
import { NewSessionModal } from '@/features/calendar/ui/create-new-session-modal';
import { useWorkTimeLimit } from '@/features/calendar/hooks/useWorkTimeLimit';
import { authAtom } from '@/src/store/auth/authAtom';
import { useAtomValue } from 'jotai';
import { Spinner } from '@/components/ui/spinner';

const data: Schedule = [
    // March 2026 — completed (past) sessions
    { date: '2026-03-01', name: 'Alice Petrova', description: 'Initial consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-001', time: [9, 10], status: 'completed', type: 'individual' },
    { date: '2026-03-03', name: 'Ivan Sokolov', description: 'Anxiety assessment.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-002', time: [10, 11], status: 'completed', type: 'individual' },
    { date: '2026-03-05', name: 'Maria Volkova', description: 'Cognitive therapy intro.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-003', time: [11, 12], status: 'completed', type: 'couple' },
    { date: '2026-03-06', name: 'Dmitry Lebedev', description: 'Family dynamics session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-004', time: [14, 15], status: 'completed', type: 'couple' },
    { date: '2026-03-08', name: 'Olga Smirnova', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-005', time: [9, 10], status: 'completed', type: 'individual' },
    { date: '2026-03-10', name: 'Pavel Morozov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-006', time: [13, 14], status: 'completed', type: 'teen' },
    { date: '2026-03-11', name: 'Elena Kozlova', description: 'Trauma therapy session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-007', time: [10, 11], status: 'completed', type: 'individual' },
    { date: '2026-03-12', name: 'Sergey Novikov', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-008', time: [15, 16], status: 'completed', type: 'couple' },
    { date: '2026-03-13', name: 'Anna Fedorova', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-009', time: [11, 12], status: 'completed', type: 'child' },
    { date: '2026-03-15', name: 'Nikita Orlov', description: 'Phobia treatment.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-010', time: [8, 9], status: 'completed', type: 'individual' },
    { date: '2026-03-17', name: 'Tatiana Belova', description: 'Grief counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-011', time: [12, 13], status: 'completed', type: 'individual' },
    { date: '2026-03-18', name: 'Andrey Zaytsev', description: 'OCD therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-012', time: [10, 11], status: 'completed', type: 'teen' },
    { date: '2026-03-19', name: 'Yulia Stepanova', description: 'Burnout session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-013', time: [14, 15], status: 'completed', type: 'individual' },
    { date: '2026-03-20', name: 'Viktor Romanov', description: 'Anger management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-014', time: [9, 10], status: 'completed', type: 'couple' },
    { date: '2026-03-21', name: 'Maxim Pavlov', description: 'Sleep disorder therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-015', time: [11, 12], status: 'completed', type: 'individual' },
    { date: '2026-03-24', name: 'Natalia Volkov', description: 'Panic disorder session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-016', time: [13, 14], status: 'completed', type: 'teen' },
    { date: '2026-03-25', name: 'Roman Alekseev', description: 'Family therapy follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-017', time: [10, 11], status: 'completed', type: 'couple' },
    { date: '2026-03-26', name: 'Svetlana Guseva', description: 'Trauma integration.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-018', time: [15, 16], status: 'completed', type: 'individual' },
    { date: '2026-03-28', name: 'Artem Sidorov', description: 'Child behavioral therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-019', time: [9, 10], status: 'completed', type: 'child' },
    { date: '2026-03-31', name: 'Ksenia Popova', description: 'Monthly review session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-020', time: [14, 15], status: 'completed', type: 'individual' },

    // March 2026 — canceled sessions
    { date: '2026-03-02', name: 'Irina Kuznetsova', description: 'Initial consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c01', time: [9, 10], status: 'canceled', type: 'individual' },
    { date: '2026-03-04', name: 'Leonid Gromov', description: 'Anxiety assessment.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c02', time: [11, 12], status: 'canceled', type: 'teen' },
    { date: '2026-03-07', name: 'Vera Sorokina', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c03', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-03-09', name: 'Kirill Voronov', description: 'Trauma therapy session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c04', time: [14, 15], status: 'canceled', type: 'couple' },
    { date: '2026-03-11', name: 'Ekaterina Lysova', description: 'Cognitive therapy intro.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c05', time: [8, 9], status: 'canceled', type: 'child' },
    { date: '2026-03-13', name: 'Bogdan Trofimov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c06', time: [13, 14], status: 'canceled', type: 'individual' },
    { date: '2026-03-14', name: 'Alina Zhukova', description: 'Family dynamics session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c07', time: [15, 16], status: 'canceled', type: 'couple' },
    { date: '2026-03-16', name: 'Oleg Savchenko', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c08', time: [12, 13], status: 'canceled', type: 'teen' },
    { date: '2026-03-18', name: 'Nadezhda Kovaleva', description: 'Grief counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c09', time: [9, 10], status: 'canceled', type: 'individual' },
    { date: '2026-03-20', name: 'Timur Isakov', description: 'Panic disorder session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c10', time: [11, 12], status: 'canceled', type: 'child' },
    { date: '2026-03-22', name: 'Galina Merkureva', description: 'Anger management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c11', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-03-24', name: 'Stepan Ryabov', description: 'OCD therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c12', time: [14, 15], status: 'canceled', type: 'teen' },
    { date: '2026-03-26', name: 'Oksana Filatova', description: 'Sleep disorder therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c13', time: [8, 9], status: 'canceled', type: 'individual' },
    { date: '2026-03-28', name: 'Konstantin Shevchenko', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c14', time: [13, 14], status: 'canceled', type: 'couple' },
    { date: '2026-03-30', name: 'Tamara Belousova', description: 'Burnout session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c15', time: [15, 16], status: 'canceled', type: 'individual' },

    { date: '2026-04-01', name: 'Bob Johnson', description: 'Kickoff.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-026', time: [8, 9], status: 'upcoming', type: 'individual' },

    { date: '2026-04-02', name: 'Bob Johnson', description: 'Daily sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-027', time: [9, 10], status: 'upcoming', type: 'couple' },

    { date: '2026-04-03', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-028', time: [11, 12], status: 'pending', type: 'child' },

    { date: '2026-04-04', name: 'Bob Johnson', description: 'Planning session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-002', time: [9, 10], status: 'upcoming', type: 'teen' },
    { date: '2026-04-04', name: 'Bob Johnson', description: 'Client call.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-029', time: [13, 14], status: 'pending', type: 'individual' },

    { date: '2026-04-05', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-003', time: [11, 12], status: 'upcoming', type: 'couple' },
    { date: '2026-04-05', name: 'Bob Johnson', description: 'Wrap-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-030', time: [15, 16], status: 'upcoming', type: 'child' },

    { date: '2026-04-06', name: 'Bob Johnson', description: 'Client call.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-004', time: [13, 14], status: 'upcoming', type: 'teen' },

    { date: '2026-04-07', name: 'Bob Johnson', description: 'Team sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-005', time: [15, 16], status: 'upcoming', type: 'individual' },

    { date: '2026-04-08', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-08', name: 'Ivan Sokolov', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-102', time: [7, 8], status: 'pending', type: 'individual' },
    { date: '2026-04-08', name: 'Maria Volkova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-103', time: [8, 9], status: 'upcoming', type: 'couple' },
    { date: '2026-04-08', name: 'Olga Smirnova', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-105', time: [10, 11], status: 'upcoming', type: 'individual' },
    { date: '2026-04-08', name: 'Pavel Morozov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-106', time: [11, 12], status: 'upcoming', type: 'teen' },
    { date: '2026-04-08', name: 'Elena Kozlova', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-107', time: [12, 13], status: 'pending', type: 'individual' },
    { date: '2026-04-08', name: 'Sergey Novikov', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-108', time: [13, 14], status: 'upcoming', type: 'couple' },
    { date: '2026-04-08', name: 'Anna Fedorova', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-109', time: [14, 15], status: 'upcoming', type: 'child' },
    { date: '2026-04-08', name: 'Nikita Orlov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-110', time: [15, 16], status: 'upcoming', type: 'individual' },

    { date: '2026-04-09', name: 'Bob Johnson', description: 'Sprint review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-007', time: [10, 11], status: 'upcoming', type: 'couple' },

    { date: '2026-04-10', name: 'Bob Johnson', description: 'Architecture discussion.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-008', time: [11, 12], status: 'upcoming', type: 'teen' },

    { date: '2026-04-11', name: 'Bob Johnson', description: 'Code review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-009', time: [14, 15], status: 'upcoming', type: 'individual' },

    { date: '2026-04-12', name: 'Bob Johnson', description: 'Retrospective.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-010', time: [16, 17], status: 'upcoming', type: 'child' },

    { date: '2026-04-13', name: 'Bob Johnson', description: 'Morning sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-011', time: [8, 9], status: 'upcoming', type: 'individual' },

    { date: '2026-04-14', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-14', name: 'Ivan Sokolov', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-102', time: [7, 8], status: 'upcoming', type: 'teen' },
    { date: '2026-04-14', name: 'Maria Volkova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-103', time: [8, 9], status: 'upcoming', type: 'couple' },
    { date: '2026-04-14', name: 'Dmitry Lebedev', description: 'Family counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-104', time: [9, 10], status: 'pending', type: 'couple' },
    { date: '2026-04-14', name: 'Olga Smirnova', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-105', time: [10, 11], status: 'upcoming', type: 'individual' },
    { date: '2026-04-14', name: 'Pavel Morozov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-106', time: [11, 12], status: 'upcoming', type: 'child' },
    { date: '2026-04-14', name: 'Elena Kozlova', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-107', time: [12, 13], status: 'upcoming', type: 'individual' },
    { date: '2026-04-14', name: 'Sergey Novikov', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-108', time: [13, 14], status: 'upcoming', type: 'couple' },
    { date: '2026-04-14', name: 'Anna Fedorova', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-109', time: [14, 15], status: 'upcoming', type: 'teen' },
    { date: '2026-04-14', name: 'Nikita Orlov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-110', time: [15, 16], status: 'upcoming', type: 'individual' },

    { date: '2026-04-15', name: 'Tatiana Belova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-111', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-15', name: 'Andrey Zaytsev', description: 'Phobia treatment.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-112', time: [7, 8], status: 'upcoming', type: 'child' },
    { date: '2026-04-15', name: 'Yulia Stepanova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-113', time: [8, 9], status: 'upcoming', type: 'teen' },
    { date: '2026-04-15', name: 'Viktor Romanov', description: 'Grief counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-114', time: [9, 10], status: 'pending', type: 'individual' },
    { date: '2026-04-15', name: 'Bob Johnson', description: 'Design sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-013', time: [10, 11], status: 'upcoming', type: 'couple' },
    { date: '2026-04-15', name: 'Maxim Pavlov', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-116', time: [11, 12], status: 'upcoming', type: 'individual' },
    { date: '2026-04-15', name: 'Natalia Volkov', description: 'Depression session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-117', time: [12, 13], status: 'upcoming', type: 'teen' },
    { date: '2026-04-15', name: 'Roman Alekseev', description: 'Family therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-118', time: [13, 14], status: 'upcoming', type: 'couple' },
    { date: '2026-04-15', name: 'Svetlana Guseva', description: 'Trauma follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-119', time: [14, 15], status: 'upcoming', type: 'individual' },
    { date: '2026-04-15', name: 'Artem Sidorov', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-120', time: [15, 16], status: 'upcoming', type: 'child' },

    { date: '2026-04-16', name: 'Ksenia Popova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-121', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-16', name: 'Mikhail Egorov', description: 'OCD therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-122', time: [7, 8], status: 'upcoming', type: 'teen' },
    { date: '2026-04-16', name: 'Daria Tikhonova', description: 'Cognitive therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-123', time: [8, 9], status: 'upcoming', type: 'child' },
    { date: '2026-04-16', name: 'Alexey Baranov', description: 'Burnout counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-124', time: [9, 10], status: 'pending', type: 'individual' },
    { date: '2026-04-16', name: 'Polina Voronova', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-125', time: [10, 11], status: 'upcoming', type: 'couple' },
    { date: '2026-04-16', name: 'Bob Johnson', description: 'Client presentation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-014', time: [11, 12], status: 'upcoming', type: 'individual' },
    { date: '2026-04-16', name: 'Denis Korolev', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-126', time: [11, 12], status: 'upcoming', type: 'teen' },
    { date: '2026-04-16', name: 'Veronika Moiseeva', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-127', time: [12, 13], status: 'pending', type: 'individual' },
    { date: '2026-04-16', name: 'Ludmila Fomina', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-129', time: [14, 15], status: 'upcoming', type: 'couple' },
    { date: '2026-04-16', name: 'Grigory Nikitin', description: 'Closing consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-130', time: [15, 16], status: 'upcoming', type: 'child' },

    { date: '2026-04-17', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-17', name: 'Bob Johnson', description: 'Wrap-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-015', time: [15, 16], status: 'upcoming', type: 'teen' },

    { date: '2026-04-18', name: 'Alice Petrova', description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-101', time: [6, 7], status: 'upcoming', type: 'individual' },
    { date: '2026-04-18', name: 'Bob Johnson', description: 'Team check-in.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-016', time: [9, 10], status: 'upcoming', type: 'couple' },

    { date: '2026-04-19', name: 'Bob Johnson', description: 'Planning.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-017', time: [11, 12], status: 'pending', type: 'child' },

    { date: '2026-04-20', name: 'Bob Johnson', description: 'Design review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-018', time: [14, 15], status: 'upcoming', type: 'individual' },

    { date: '2026-04-21', name: 'Bob Johnson', description: 'Sprint demo.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-019', time: [10, 11], status: 'upcoming', type: 'teen' },

    { date: '2026-04-22', name: 'Bob Johnson', description: 'Retrospective.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-020', time: [12, 13], status: 'upcoming', type: 'couple' },

    { date: '2026-04-23', name: 'Bob Johnson', description: 'One-on-one.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-021', time: [8, 9], status: 'pending', type: 'individual' },

    { date: '2026-04-24', name: 'Bob Johnson', description: 'Architecture review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-022', time: [11, 12], status: 'upcoming', type: 'child' },

    { date: '2026-04-25', name: 'Bob Johnson', description: 'Code review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-023', time: [13, 14], status: 'pending', type: 'individual' },

    { date: '2026-04-26', name: 'Bob Johnson', description: 'Team sync.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-024', time: [15, 16], status: 'upcoming', type: 'couple' },

    { date: '2026-04-27', name: 'Bob Johnson', description: 'Planning.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mtg-025', time: [16, 17], status: 'upcoming', type: 'teen' },

    // April 2026 — canceled sessions
    { date: '2026-04-02', name: 'Larisa Morozova', description: 'Initial consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c01', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-04-05', name: 'Vadim Karpov', description: 'Anxiety session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c02', time: [13, 14], status: 'canceled', type: 'teen' },
    { date: '2026-04-08', name: 'Zoya Loginova', description: 'Family therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c03', time: [9, 10], status: 'canceled', type: 'couple' },
    { date: '2026-04-10', name: 'Ruslan Kolesnikov', description: 'CBT session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c04', time: [11, 12], status: 'canceled', type: 'child' },
    { date: '2026-04-13', name: 'Margarita Naumova', description: 'Trauma therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c05', time: [15, 16], status: 'canceled', type: 'individual' },
    { date: '2026-04-16', name: 'Fedor Klimov', description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c06', time: [8, 9], status: 'canceled', type: 'individual' },
    { date: '2026-04-18', name: 'Angelina Parfenova', description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c07', time: [14, 15], status: 'canceled', type: 'teen' },
    { date: '2026-04-21', name: 'Gleb Sobolev', description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c08', time: [12, 13], status: 'canceled', type: 'couple' },
    { date: '2026-04-24', name: 'Lyudmila Grishina', description: 'Grief counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c09', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-04-26', name: 'Artur Davydov', description: 'Anger management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c10', time: [16, 17], status: 'canceled', type: 'child' },
];

type NewSession = { date: Date; startHour: number; endHour: number; name: string; x: number; y: number } | null;

type CalendarTab = ({} & string) | 'month' | 'week' | 'day' | 'list';

export const ShownDateInterval = createContext({
    getter: {
        currTab: 'month' as CalendarTab,
        shownInterval: new Date(),
        selectedUid: null as string | null,
        newSession: null as NewSession,
    },
    setter: {
        setShownInterval: function () { } as (date: Date) => void,
        setCurrTab: function () { } as (tab: CalendarTab) => void,
        navigate: function () { } as (updates: { date?: Date; tab?: CalendarTab }) => void,
        setSelectedUid: function () { } as Dispatch<SetStateAction<string | null>>,
        setNewSession: function () { } as Dispatch<SetStateAction<NewSession>>,
        addPendingSession: function () { } as (session: VisitRecord) => void,
    },
});

function CalendarContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const shownInterval = useMemo(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            const parsed = parse(dateParam, 'yyyy-MM-dd', new Date());
            return isNaN(parsed.getTime()) ? new Date() : parsed;
        }
        return new Date();
    }, [searchParams]);

    const currTab: CalendarTab = (searchParams.get('tab') as CalendarTab) || 'month';

    const [selectedUid, setSelectedUid] = useState<string | null>(null);
    const [newSession, setNewSession] = useState<NewSession>(null);
    const [schedule, setSchedule] = useState<Schedule>(data);

    const { user, loading: authLoading } = useAtomValue(authAtom);
    const { data: workTimeLimitResponse, isLoading: workTimeLimitLoading } = useWorkTimeLimit(user?.uid ?? null, authLoading);
    const workTimeLimit = workTimeLimitResponse?.data;

    const addPendingSession = useCallback((session: VisitRecord) => {
        setSchedule(prev => [...prev, session]);
    }, []);

    const navigate = useCallback((updates: { date?: Date; tab?: CalendarTab }) => {
        const params = new URLSearchParams(searchParams.toString());
        if (updates.date) params.set('date', toDateKey(updates.date));
        if (updates.tab) params.set('tab', updates.tab);
        router.push(`?${params.toString()}`);
    }, [router, searchParams]);

    const setShownInterval = useCallback((date: Date) => {
        navigate({ date });
    }, [navigate]);

    const setCurrTab = useCallback((tab: CalendarTab) => {
        navigate({ tab });
    }, [navigate]);

    const intervalStep = (dir: -1 | 1) => {
        let end, start;
        switch (currTab) {
            case 'week':
                end = endOfWeek(shownInterval, { weekStartsOn: 0 });
                start = startOfWeek(shownInterval, { weekStartsOn: 0 });

                setShownInterval(getMiddleDate(addDays(end, 7 * dir), addDays(start, 7 * dir)));
                break;

            case 'list':
                end = endOfWeek(shownInterval, { weekStartsOn: 0 });
                start = startOfWeek(shownInterval, { weekStartsOn: 0 });

                setShownInterval(getMiddleDate(addDays(end, 7 * dir), addDays(start, 7 * dir)));
                break;

            case 'month':
                const days = getDaysInMonth(shownInterval);

                end = endOfMonth(shownInterval);
                start = startOfMonth(shownInterval);

                setShownInterval(getMiddleDate(addDays(end, days * dir), addDays(start, days * dir)));
                break;

            case 'day':
                setShownInterval(addDays(shownInterval, 1 * dir));
                break;
        }
    };

    const title = useMemo(() => {
        const date = getTime(shownInterval);
        switch (currTab) {
            case 'week':
                return `${format(date, 'MMM', { locale: he })} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;

            case 'month':
                return format(date, 'MMMM, yyyy', { locale: he });

            case 'day':
                return format(shownInterval, 'MMMM dd, yyyy', { locale: he });

            case 'list':
                return `${format(date, 'MMM', { locale: he })} ${format(startOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')} — ${format(endOfWeek(shownInterval, { weekStartsOn: 0 }), 'dd')}, ${format(date, 'yyyy')}`;
        }
    }, [shownInterval, currTab]);

    return (
        <ShownDateInterval.Provider
            value={{
                getter: { shownInterval, currTab, selectedUid, newSession },
                setter: { setShownInterval, setCurrTab, navigate, setSelectedUid, setNewSession, addPendingSession },
            }}
        >
            <Widget
                variant="default"
                dir="rtl"
                className="relative m-2 flex max-h-[calc(100%-16px)] min-h-0 flex-1 flex-col gap-0"
            >
                {newSession && (
                    <NewSessionModal />
                )}
                <Widget.Content className="max-h-full *:max-h-full">
                    <Tabs
                        value={currTab}
                        defaultValue="week"
                        onValueChange={setCurrTab}
                        className="flex h-full min-h-0 w-full flex-col gap-0"
                        dir='rtl'
                    >
                        <ItemHeader className="w-full basis-0 grid grid-cols-[1fr_auto_1fr] items-center justify-items gap-y-2 p-3">
                            <h1 className="truncate text-lg">{title}</h1>
                            <TabsList className="*:flex-1 *:cursor-pointer *:font-normal bg-primary/60 min-w-100">
                                <TabsTrigger value="month" >חודש</TabsTrigger>
                                <TabsTrigger value="week" >שבוע</TabsTrigger>
                                <TabsTrigger value="day" >יום</TabsTrigger>
                                <TabsTrigger value="list" >רשימה</TabsTrigger>
                            </TabsList>

                            <div className="flex justify-end gap-2 *:cursor-pointer *:shadow-sm">
                                <Button variant="ghost" className="mx-3 bg-white" size={'icon'}><Plus /></Button>
                                <Button onClick={() => intervalStep(-1)} variant="ghost" size={'icon'} className='bg-white'>
                                    <ChevronLeft className='rotate-180' />
                                </Button>
                                <Button onClick={() => setShownInterval(new Date())} variant="ghost" className='bg-white'>
                                    היום
                                </Button>
                                <Button onClick={() => intervalStep(1)} variant="ghost" size={'icon'} className='bg-white'>
                                    <ChevronRight className='rotate-180' />
                                </Button>
                            </div>
                        </ItemHeader>

                        <Separator />

                        <div className="relative flex-1 min-h-0">
                            <MonthTab schedule={schedule} />
                            {workTimeLimit && <>
                                <WeekTab schedule={schedule} workTimeLimit={workTimeLimit} />
                                <DayTab schedule={schedule} workTimeLimit={workTimeLimit} />
                                <ListTab schedule={schedule} workTimeLimit={workTimeLimit} />
                            </>}
                            {!workTimeLimit && (
                                <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
                                    <Spinner className="size-8 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </Tabs>
                </Widget.Content>
            </Widget>
        </ShownDateInterval.Provider>
    );
}

export default function Calendar() {
    return (
        <Suspense>
            <CalendarContent />
        </Suspense>
    );
}
