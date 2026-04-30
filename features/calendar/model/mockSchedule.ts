import { Timestamp } from 'firebase/firestore';
import { PatientInfo, Schedule } from './types';

const ts = (dateStr: string) => Timestamp.fromDate(new Date(dateStr));

const p = (firstName: string, lastName: string, gender: 'male' | 'female', birthDate: string): PatientInfo => ({
    firstName, lastName, gender, photoUrl: null, languages: ['ru', 'he'], birthDate
});

const PATIENTS: Record<string, PatientInfo> = {
    'Alice Petrova':       p('Alice',      'Petrova',     'female', '1990-01-01'),
    'Ivan Sokolov':        p('Ivan',       'Sokolov',     'male', '1985-05-15'),
    'Maria Volkova':       p('Maria',      'Volkova',     'female', '1992-08-20'),
    'Dmitry Lebedev':      p('Dmitry',     'Lebedev',     'male', '1988-12-10'),
    'Olga Smirnova':       p('Olga',       'Smirnova',    'female', '1995-03-25'),
    'Pavel Morozov':       p('Pavel',      'Morozov',     'male', '1987-07-30'),
    'Elena Kozlova':       p('Elena',      'Kozlova',     'female', '1990-06-15'),
    'Sergey Novikov':      p('Sergey',     'Novikov',     'male', '1985-09-20'),
    'Anna Fedorova':       p('Anna',       'Fedorova',    'female', '1992-11-10'),
    'Nikita Orlov':        p('Nikita',     'Orlov',       'male', '1988-03-25'),
    'Andrey Zaytsev':      p('Andrey',     'Zaytsev',     'male', '1990-07-15'),
    'Yulia Stepanova':     p('Yulia',      'Stepanova',   'female', '1993-12-10'),
    'Viktor Romanov':      p('Viktor',     'Romanov',     'male', '1987-04-20'),
    'Maxim Pavlov':        p('Maxim',      'Pavlov',      'male', '1989-08-25'),
    'Natalia Volkov':      p('Natalia',    'Volkov',      'female', '1991-01-30'),
    'Roman Alekseev':      p('Roman',      'Alekseev',    'male', '1986-06-15'),
    'Svetlana Guseva':     p('Svetlana',   'Guseva',      'female', '1994-09-20'),
    'Artem Sidorov':       p('Artem',      'Sidorov',     'male', '1987-12-10'),
    'Ksenia Popova':       p('Ksenia',     'Popova',      'female', '1993-03-25'),
    'Daria Tikhonova':     p('Daria',      'Tikhonova',   'female', '1990-01-01'),
    'Alexey Baranov':      p('Alexey',     'Baranov',     'male', '1985-05-15'),
    'Polina Voronova':     p('Polina',     'Voronova',    'female', '1992-08-20'),
    'Ludmila Fomina':      p('Ludmila',    'Fomina',      'female', '1990-06-15'),
    'Grigory Nikitin':     p('Grigory',    'Nikitin',     'male', '1985-09-20'),
    'Irina Kuznetsova':    p('Irina',      'Kuznetsova',  'female', '1992-11-10'),
    'Leonid Gromov':       p('Leonid',     'Gromov',      'male', '1987-04-20'),
    'Vera Sorokina':       p('Vera',       'Sorokina',    'female', '1993-12-10'),
    'Kirill Voronov':      p('Kirill',     'Voronov',     'male', '1988-03-25'),
    'Ekaterina Lysova':    p('Ekaterina',  'Lysova',      'female', '1990-06-15'),
    'Bogdan Trofimov':     p('Bogdan',     'Trofimov',    'male', '1987-12-10'),
    'Alina Zhukova':       p('Alina',      'Zhukova',     'female', '1993-03-25'),
    'Nadezhda Kovaleva':   p('Nadezhda',   'Kovaleva',    'female', '1991-01-30'),
    'Timur Isakov':        p('Timur',      'Isakov',      'male', '1986-06-15'),
    'Galina Merkureva':    p('Galina',     'Merkureva',   'female', '1994-09-20'),
    'Stepan Ryabov':       p('Stepan',     'Ryabov',      'male', '1987-12-10'),
    'Oksana Filatova':     p('Oksana',     'Filatova',    'female', '1993-03-25'),
    'Konstantin Shevchenko': p('Konstantin', 'Shevchenko', 'male', '1985-01-01'),
    'Tamara Belousova':    p('Tamara',     'Belousova',   'female', '1990-01-01'),
    'Larisa Morozova':     p('Larisa',     'Morozova',    'female', '1992-01-01'),
    'Vadim Karpov':        p('Vadim',      'Karpov',      'male', '1985-01-01'),
    'Zoya Loginova':       p('Zoya',       'Loginova',    'female', '1990-01-01'),
    'Ruslan Kolesnikov':   p('Ruslan',     'Kolesnikov',  'male', '1989-08-25'),
    'Margarita Naumova':   p('Margarita',  'Naumova',     'female', '1991-01-30'),
    'Fedor Klimov':        p('Fedor',      'Klimov',      'male', '1987-04-20'),
    'Angelina Parfenova':  p('Angelina',   'Parfenova',   'female', '1993-12-10'),
    'Lyudmila Grishina':   p('Lyudmila',   'Grishina',    'female', '1990-01-01'),
    'Artur Davydov':       p('Artur',      'Davydov',     'male', '1985-01-01'),
    'Tatiana Belova':      p('Tatiana',    'Belova',      'female', '1991-07-12'),
    'Oleg Savchenko':      p('Oleg',       'Savchenko',   'male', '1988-02-28'),
    'Mikhail Egorov':      p('Mikhail',    'Egorov',      'male', '1993-05-03'),
    'Denis Korolev':       p('Denis',      'Korolev',     'male', '1996-09-17'),
    'Veronika Moiseeva':   p('Veronika',   'Moiseeva',    'female', '1994-11-22'),
    'Gleb Sobolev':        p('Gleb',       'Sobolev',     'male', '1989-04-08'),
};

const P = (key: string) => PATIENTS[key];

export const mockSchedule: Schedule = [
    // ─── March 2026 — completed ───────────────────────────────────────────────
    { date: '2026-03-01', patient: P('Alice Petrova'),       description: 'Initial consultation.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-001', time: [9,  10], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-02-15'), note: 'First contact. Patient reports long-standing anxiety tied to work pressure. Avoidance behaviors noted.' },
    ]},
    { date: '2026-03-03', patient: P('Ivan Sokolov'),        description: 'Anxiety assessment.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-002', time: [10, 11], status: 'completed', type: 'individual' },
    { date: '2026-03-05', patient: P('Maria Volkova'),       description: 'Cognitive therapy intro.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-003', time: [11, 12], status: 'completed', type: 'couple',     notes: [
        { date: ts('2026-02-20'), note: 'Couple referred by GP. Communication breakdown is the primary complaint. Both partners willing to engage.' },
        { date: ts('2026-03-01'), note: 'Identified core conflict around unmet expectations at home. Assigned reflective listening exercise.' },
    ]},
    { date: '2026-03-06', patient: P('Dmitry Lebedev'),      description: 'Family dynamics session.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-004', time: [14, 15], status: 'completed', type: 'couple' },
    { date: '2026-03-08', patient: P('Olga Smirnova'),       description: 'Depression follow-up.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-005', time: [9,  10], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-02-10'), note: 'PHQ-9 score: 14 (moderate depression). History of seasonal episodes. Currently on medication, stable.' },
        { date: ts('2026-02-24'), note: 'Energy levels slightly improved. Still withdrawing from social activities. Behavioral activation plan started.' },
    ]},
    { date: '2026-03-10', patient: P('Pavel Morozov'),       description: 'Stress management.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-006', time: [13, 14], status: 'completed', type: 'teen' },
    { date: '2026-03-11', patient: P('Elena Kozlova'),       description: 'Trauma therapy session.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-007', time: [10, 11], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-01-20'), note: 'Single trauma event (car accident, 2024). Flashbacks and hypervigilance reported. EMDR protocol started.' },
        { date: ts('2026-02-17'), note: 'Phase 2 EMDR. Patient able to discuss the event with reduced distress. SUD rating dropped from 8 to 5.' },
        { date: ts('2026-03-03'), note: 'Good progress. Nightmares less frequent. Starting phase 3 (desensitization of core memory).' },
    ]},
    { date: '2026-03-12', patient: P('Sergey Novikov'),      description: 'Relationship counseling.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-008', time: [15, 16], status: 'completed', type: 'couple' },
    { date: '2026-03-13', patient: P('Anna Fedorova'),       description: 'CBT session.',              meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-009', time: [11, 12], status: 'completed', type: 'child',     notes: [
        { date: ts('2026-02-28'), note: 'Child (age 9) showing selective mutism at school. Parents report no issues at home. Likely school-related anxiety.' },
    ]},
    { date: '2026-03-15', patient: P('Nikita Orlov'),        description: 'Phobia treatment.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-010', time: [8,  9],  status: 'completed', type: 'individual' },
    { date: '2026-03-17', patient: P('Tatiana Belova'),      description: 'Grief counseling.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-011', time: [12, 13], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-01-05'), note: 'Patient lost her mother 3 months ago. Currently in bargaining stage. Functional but isolating.' },
        { date: ts('2026-02-09'), note: 'Moved into depression stage. Appetite decreased. Referred to psychiatrist for evaluation — pending.' },
        { date: ts('2026-03-02'), note: 'No medication prescribed. Working through meaning-making. Keeps a memory journal, finds it helpful.' },
    ]},
    { date: '2026-03-18', patient: P('Andrey Zaytsev'),      description: 'OCD therapy.',              meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-012', time: [10, 11], status: 'completed', type: 'teen' },
    { date: '2026-03-19', patient: P('Yulia Stepanova'),     description: 'Burnout session.',          meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-013', time: [14, 15], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-03-05'), note: 'Classic burnout presentation: emotional exhaustion, depersonalization. Currently on sick leave. High achiever background.' },
    ]},
    { date: '2026-03-20', patient: P('Viktor Romanov'),      description: 'Anger management.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-014', time: [9,  10], status: 'completed', type: 'couple' },
    { date: '2026-03-21', patient: P('Maxim Pavlov'),        description: 'Sleep disorder therapy.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-015', time: [11, 12], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-02-14'), note: 'CBT-I protocol initiated. Sleep diary started. Average sleep onset latency: 90 min. Sleep efficiency: 62%.' },
        { date: ts('2026-03-07'), note: 'Sleep restriction implemented. Patient resistant initially but compliance improved. Latency down to 45 min.' },
    ]},
    { date: '2026-03-24', patient: P('Natalia Volkov'),      description: 'Panic disorder session.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-016', time: [13, 14], status: 'completed', type: 'teen' },
    { date: '2026-03-25', patient: P('Roman Alekseev'),      description: 'Family therapy follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-017', time: [10, 11], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-03-11'), note: 'Second joint session. Conflict de-escalation skills practiced. Homework: 10-min check-ins twice a week.' },
    ]},
    { date: '2026-03-26', patient: P('Svetlana Guseva'),     description: 'Trauma integration.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-018', time: [15, 16], status: 'completed', type: 'individual' },
    { date: '2026-03-28', patient: P('Artem Sidorov'),       description: 'Child behavioral therapy.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-019', time: [9,  10], status: 'completed', type: 'child',     notes: [
        { date: ts('2026-03-14'), note: 'ADHD confirmed (assessed externally). Working on impulse control. Parents included in psychoeducation.' },
    ]},
    { date: '2026-03-31', patient: P('Ksenia Popova'),       description: 'Monthly review session.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-020', time: [14, 15], status: 'completed', type: 'individual' },

    // ─── March 2026 — canceled ───────────────────────────────────────────────
    { date: '2026-03-02', patient: P('Irina Kuznetsova'),    description: 'Initial consultation.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c01', time: [9,  10], status: 'canceled', type: 'individual' },
    { date: '2026-03-04', patient: P('Leonid Gromov'),       description: 'Anxiety assessment.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c02', time: [11, 12], status: 'canceled', type: 'teen' },
    { date: '2026-03-07', patient: P('Vera Sorokina'),       description: 'Depression follow-up.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c03', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-03-09', patient: P('Kirill Voronov'),      description: 'Trauma therapy session.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c04', time: [14, 15], status: 'canceled', type: 'couple' },
    { date: '2026-03-11', patient: P('Ekaterina Lysova'),    description: 'Cognitive therapy intro.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c05', time: [8,  9],  status: 'canceled', type: 'child' },
    { date: '2026-03-13', patient: P('Bogdan Trofimov'),     description: 'Stress management.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c06', time: [13, 14], status: 'canceled', type: 'individual' },
    { date: '2026-03-14', patient: P('Alina Zhukova'),       description: 'Family dynamics session.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c07', time: [15, 16], status: 'canceled', type: 'couple' },
    { date: '2026-03-16', patient: P('Oleg Savchenko'),      description: 'CBT session.',             meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c08', time: [12, 13], status: 'canceled', type: 'teen' },
    { date: '2026-03-18', patient: P('Nadezhda Kovaleva'),   description: 'Grief counseling.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c09', time: [9,  10], status: 'canceled', type: 'individual' },
    { date: '2026-03-20', patient: P('Timur Isakov'),        description: 'Panic disorder session.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c10', time: [11, 12], status: 'canceled', type: 'child' },
    { date: '2026-03-22', patient: P('Galina Merkureva'),    description: 'Anger management.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c11', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-03-24', patient: P('Stepan Ryabov'),       description: 'OCD therapy.',             meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c12', time: [14, 15], status: 'canceled', type: 'teen' },
    { date: '2026-03-26', patient: P('Oksana Filatova'),     description: 'Sleep disorder therapy.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c13', time: [8,  9],  status: 'canceled', type: 'individual' },
    { date: '2026-03-28', patient: P('Konstantin Shevchenko'), description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c14', time: [13, 14], status: 'canceled', type: 'couple' },
    { date: '2026-03-30', patient: P('Tamara Belousova'),    description: 'Burnout session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'mar-c15', time: [15, 16], status: 'canceled', type: 'individual' },

    // ─── April 2026 — completed (Apr 1–27) ───────────────────────────────────
    { date: '2026-04-01', patient: P('Alice Petrova'),   description: 'Kickoff.',             meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-001', time: [8,  9],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-26'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
        { date: ts('2026-04-22'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
        { date: ts('2026-04-21'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
        { date: ts('2026-04-12'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
        { date: ts('2026-04-13'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
        { date: ts('2026-04-11'), note: 'Anxiety triggers mapped. Work deadlines are the main stressor. Started relaxation techniques.' },
    ]},
    { date: '2026-04-02', patient: P('Ivan Sokolov'),    description: 'Daily sync.',          meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-002', time: [9,  10], status: 'completed', type: 'couple' },
    { date: '2026-04-03', patient: P('Maria Volkova'),   description: 'Design review.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-003', time: [11, 12], status: 'completed', type: 'child',     notes: [
        { date: ts('2026-03-20'), note: 'Child presenting with separation anxiety. School refusal started after holiday break. Parent coaching initiated.' },
    ]},
    { date: '2026-04-04', patient: P('Dmitry Lebedev'),  description: 'Planning session.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-004', time: [9,  10], status: 'completed', type: 'teen' },
    { date: '2026-04-04', patient: P('Olga Smirnova'),   description: 'Client call.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-005', time: [13, 14], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-03-25'), note: 'Mood slightly improved after medication adjustment. Continuing behavioral activation. Attended one social event.' },
    ]},
    { date: '2026-04-05', patient: P('Pavel Morozov'),   description: 'Design review.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-006', time: [11, 12], status: 'completed', type: 'couple' },
    { date: '2026-04-05', patient: P('Elena Kozlova'),   description: 'Wrap-up.',             meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-007', time: [15, 16], status: 'completed', type: 'child',     notes: [
        { date: ts('2026-03-22'), note: 'EMDR phase 4 complete. SUD rating now 2/10. Processing narrative coherence. Patient shows resilience.' },
    ]},
    { date: '2026-04-06', patient: P('Sergey Novikov'),  description: 'Client call.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-008', time: [13, 14], status: 'completed', type: 'teen' },
    { date: '2026-04-07', patient: P('Anna Fedorova'),   description: 'Team sync.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-009', time: [15, 16], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-03-31'), note: 'Progress with selective mutism: made eye contact with teacher. Reward system in place.' },
    ]},
    { date: '2026-04-08', patient: P('Alice Petrova'),   description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-010', time: [6,  7],  status: 'completed', type: 'individual' },
    { date: '2026-04-08', patient: P('Ivan Sokolov'),    description: 'Anxiety session.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-011', time: [7,  8],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-01'), note: 'Generalized anxiety worsening. New stressor: job uncertainty. Introduced GAD-7 tracking. Score: 16.' },
    ]},
    { date: '2026-04-08', patient: P('Maria Volkova'),   description: 'Cognitive therapy.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-012', time: [8,  9],  status: 'completed', type: 'couple' },
    { date: '2026-04-08', patient: P('Olga Smirnova'),   description: 'Depression follow-up.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-013', time: [10, 11], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-01'), note: 'PHQ-9 down to 9 (mild). Patient restarted morning walks. Positive momentum noted.' },
    ]},
    { date: '2026-04-08', patient: P('Pavel Morozov'),   description: 'Stress management.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-014', time: [11, 12], status: 'completed', type: 'teen' },
    { date: '2026-04-08', patient: P('Elena Kozlova'),   description: 'Trauma therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-015', time: [12, 13], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-05'), note: 'EMDR treatment complete. Installation of positive cognition successful. Discharge planning started.' },
    ]},
    { date: '2026-04-08', patient: P('Sergey Novikov'),  description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-016', time: [13, 14], status: 'completed', type: 'couple' },
    { date: '2026-04-08', patient: P('Anna Fedorova'),   description: 'CBT session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-017', time: [14, 15], status: 'completed', type: 'child' },
    { date: '2026-04-08', patient: P('Nikita Orlov'),    description: 'Closing consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-018', time: [15, 16], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-03-20'), note: 'Spider phobia. Exposure hierarchy created (10 levels). Currently at step 3: viewing photos without avoidance.' },
    ]},
    { date: '2026-04-09', patient: P('Tatiana Belova'),  description: 'Sprint review.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-019', time: [10, 11], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-06'), note: 'Grief: patient moved into acceptance phase. Plans to visit mother\'s grave with family. Emotional but resolved.' },
    ]},
    { date: '2026-04-10', patient: P('Andrey Zaytsev'),  description: 'Architecture discussion.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-020', time: [11, 12], status: 'completed', type: 'teen' },
    { date: '2026-04-11', patient: P('Yulia Stepanova'), description: 'Code review.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-021', time: [14, 15], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-04'), note: 'Burnout recovery slow but steady. Back at work part-time. Setting boundaries still difficult — key focus area.' },
    ]},
    { date: '2026-04-12', patient: P('Viktor Romanov'),  description: 'Retrospective.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-022', time: [16, 17], status: 'completed', type: 'child' },
    { date: '2026-04-13', patient: P('Maxim Pavlov'),    description: 'Morning sync.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-023', time: [8,  9],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-06'), note: 'Sleep efficiency now 78%. Stimulus control fully implemented. Sleep window extended by 30 min.' },
    ]},
    { date: '2026-04-14', patient: P('Alice Petrova'),   description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-024', time: [6,  7],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-10'), note: 'Anxiety significantly reduced. Coping toolkit solid. Discussing session frequency reduction to bi-weekly.' },
    ]},
    { date: '2026-04-14', patient: P('Ivan Sokolov'),    description: 'Anxiety session.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-025', time: [7,  8],  status: 'completed', type: 'teen' },
    { date: '2026-04-14', patient: P('Maria Volkova'),   description: 'Cognitive therapy.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-026', time: [8,  9],  status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-07'), note: 'Couple reports 2 conflict-free weeks. Empathic listening exercises working well. Reducing sessions to monthly.' },
    ]},
    { date: '2026-04-14', patient: P('Dmitry Lebedev'),  description: 'Family counseling.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-027', time: [9,  10], status: 'completed', type: 'couple' },
    { date: '2026-04-14', patient: P('Olga Smirnova'),   description: 'Depression follow-up.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-028', time: [10, 11], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-10'), note: 'PHQ-9: 6 (minimal). Patient feels ready to end therapy. Relapse prevention plan drafted together.' },
    ]},
    { date: '2026-04-14', patient: P('Pavel Morozov'),   description: 'Stress management.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-029', time: [11, 12], status: 'completed', type: 'child' },
    { date: '2026-04-14', patient: P('Elena Kozlova'),   description: 'Trauma therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-030', time: [12, 13], status: 'completed', type: 'individual' },
    { date: '2026-04-14', patient: P('Sergey Novikov'),  description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-031', time: [13, 14], status: 'completed', type: 'couple' },
    { date: '2026-04-14', patient: P('Anna Fedorova'),   description: 'CBT session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-032', time: [14, 15], status: 'completed', type: 'teen',      notes: [
        { date: ts('2026-04-10'), note: 'Selective mutism: spoke 3 words to the teacher unprompted. Huge milestone. Reinforced with praise.' },
    ]},
    { date: '2026-04-14', patient: P('Nikita Orlov'),    description: 'Closing consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-033', time: [15, 16], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-11'), note: 'Exposure step 6: watched video of spider moving. Anxiety peaked at 6/10 then subsided. Good habituation.' },
    ]},
    { date: '2026-04-15', patient: P('Tatiana Belova'),  description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-034', time: [6,  7],  status: 'completed', type: 'individual' },
    { date: '2026-04-15', patient: P('Andrey Zaytsev'),  description: 'Phobia treatment.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-035', time: [7,  8],  status: 'completed', type: 'child',     notes: [
        { date: ts('2026-04-08'), note: 'OCD: contamination theme. ERP started — resisting handwashing compulsion after touching doorknob. 20-min delay achieved.' },
    ]},
    { date: '2026-04-15', patient: P('Yulia Stepanova'), description: 'Cognitive therapy.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-036', time: [8,  9],  status: 'completed', type: 'teen' },
    { date: '2026-04-15', patient: P('Viktor Romanov'),  description: 'Grief counseling.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-037', time: [9,  10], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-08'), note: 'Anger underlying grief at partner. Exploring loss of identity after separation. Emotion regulation exercises assigned.' },
    ]},
    { date: '2026-04-15', patient: P('Maxim Pavlov'),    description: 'Design sync.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-038', time: [10, 11], status: 'completed', type: 'couple' },
    { date: '2026-04-15', patient: P('Natalia Volkov'),  description: 'Stress management.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-039', time: [11, 12], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-01'), note: 'Panic attacks: 3 per week. Interoceptive exposure started. Patient learning to tolerate elevated heart rate.' },
        { date: ts('2026-04-08'), note: 'Attacks reduced to 1 per week. Catastrophic misinterpretation less frequent. Significant progress.' },
    ]},
    { date: '2026-04-15', patient: P('Roman Alekseev'),  description: 'Depression session.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-040', time: [12, 13], status: 'completed', type: 'teen' },
    { date: '2026-04-15', patient: P('Svetlana Guseva'), description: 'Family therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-041', time: [13, 14], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-05'), note: 'Trauma integration: patient wrote letter to younger self. Strong emotional response but felt liberating.' },
    ]},
    { date: '2026-04-15', patient: P('Artem Sidorov'),   description: 'Trauma follow-up.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-042', time: [14, 15], status: 'completed', type: 'individual' },
    { date: '2026-04-16', patient: P('Ksenia Popova'),   description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-043', time: [6,  7],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-10'), note: 'Social anxiety: avoids group settings. Cognitive restructuring of "everyone is judging me" belief. Behavioral experiments planned.' },
    ]},
    { date: '2026-04-16', patient: P('Mikhail Egorov'),  description: 'OCD therapy.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-044', time: [7,  8],  status: 'completed', type: 'teen' },
    { date: '2026-04-16', patient: P('Daria Tikhonova'), description: 'Cognitive therapy.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-045', time: [8,  9],  status: 'completed', type: 'child',     notes: [
        { date: ts('2026-04-09'), note: 'Child (age 7) with separation anxiety. Gradual school reintegration plan agreed with parents. Week 1 complete.' },
    ]},
    { date: '2026-04-16', patient: P('Alexey Baranov'),  description: 'Burnout counseling.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-046', time: [9,  10], status: 'completed', type: 'individual' },
    { date: '2026-04-16', patient: P('Polina Voronova'), description: 'Anxiety session.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-047', time: [10, 11], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-12'), note: 'Relationship anxiety: fear of abandonment driving controlling behaviors. Attachment style (anxious) explored.' },
    ]},
    { date: '2026-04-16', patient: P('Denis Korolev'),   description: 'Stress management.',   meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-048', time: [11, 12], status: 'completed', type: 'teen' },
    { date: '2026-04-16', patient: P('Veronika Moiseeva'), description: 'Trauma therapy.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-049', time: [12, 13], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-13'), note: 'Childhood trauma. Somatic symptoms prominent (tension in chest). Body-oriented work introduced alongside cognitive.' },
    ]},
    { date: '2026-04-16', patient: P('Ludmila Fomina'),  description: 'CBT session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-050', time: [14, 15], status: 'completed', type: 'couple' },
    { date: '2026-04-16', patient: P('Grigory Nikitin'), description: 'Closing consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-051', time: [15, 16], status: 'completed', type: 'child' },
    { date: '2026-04-17', patient: P('Alice Petrova'),   description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-052', time: [6,  7],  status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-14'), note: 'Final session before bi-weekly transition. Patient confident in self-management. Emergency plan reviewed.' },
    ]},
    { date: '2026-04-17', patient: P('Ivan Sokolov'),    description: 'Wrap-up.',             meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-053', time: [15, 16], status: 'completed', type: 'teen',      notes: [
        { date: ts('2026-04-14'), note: 'GAD-7 now 8 (mild). Job situation stabilized. Thought records being used consistently. Good prognosis.' },
    ]},
    { date: '2026-04-18', patient: P('Maria Volkova'),   description: 'Morning consultation.',meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-054', time: [6,  7],  status: 'completed', type: 'individual' },
    { date: '2026-04-18', patient: P('Dmitry Lebedev'),  description: 'Team check-in.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-055', time: [9,  10], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-15'), note: 'Couple reports increased intimacy. Conflict frequency down. Working on individual self-soothing before joint conversations.' },
    ]},
    { date: '2026-04-19', patient: P('Olga Smirnova'),   description: 'Planning.',            meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-056', time: [11, 12], status: 'completed', type: 'child' },
    { date: '2026-04-20', patient: P('Pavel Morozov'),   description: 'Design review.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-057', time: [14, 15], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-17'), note: 'Stress tied to academic pressure (university exams). Perfectionism core belief identified. CBT case conceptualization shared.' },
    ]},
    { date: '2026-04-21', patient: P('Elena Kozlova'),   description: 'Sprint demo.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-058', time: [10, 11], status: 'completed', type: 'teen' },
    { date: '2026-04-22', patient: P('Sergey Novikov'),  description: 'Retrospective.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-059', time: [12, 13], status: 'completed', type: 'couple',    notes: [
        { date: ts('2026-04-18'), note: 'Communication improved after structured dialogue exercise. Both partners feel more heard. Positive shift noted.' },
    ]},
    { date: '2026-04-23', patient: P('Anna Fedorova'),   description: 'One-on-one.',          meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-060', time: [8,  9],  status: 'completed', type: 'individual' },
    { date: '2026-04-24', patient: P('Nikita Orlov'),    description: 'Architecture review.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-061', time: [11, 12], status: 'completed', type: 'child',     notes: [
        { date: ts('2026-04-21'), note: 'Exposure step 9: held a plastic spider. Anxiety peaked at 4/10, dissipated in 8 min. Nearly complete.' },
    ]},
    { date: '2026-04-25', patient: P('Tatiana Belova'),  description: 'Code review.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-062', time: [13, 14], status: 'completed', type: 'individual', notes: [
        { date: ts('2026-04-22'), note: 'Grief fully processed. Patient plans volunteer work in memory of her mother. Termination session scheduled for May.' },
    ]},
    { date: '2026-04-26', patient: P('Andrey Zaytsev'),  description: 'Team sync.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-063', time: [15, 16], status: 'completed', type: 'couple' },
    { date: '2026-04-27', patient: P('Yulia Stepanova'), description: 'Planning.',            meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-064', time: [16, 17], status: 'completed', type: 'teen',      notes: [
        { date: ts('2026-04-24'), note: 'Back to full-time work. Burnout symptoms resolved. Focusing on sustainable work habits and relapse prevention.' },
    ]},

    // ─── April 2026 — canceled ───────────────────────────────────────────────
    { date: '2026-04-02', patient: P('Larisa Morozova'),  description: 'Initial consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c01', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-04-05', patient: P('Vadim Karpov'),     description: 'Anxiety session.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c02', time: [13, 14], status: 'canceled', type: 'teen' },
    { date: '2026-04-08', patient: P('Zoya Loginova'),    description: 'Family therapy.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c03', time: [9,  10], status: 'canceled', type: 'couple' },
    { date: '2026-04-10', patient: P('Ruslan Kolesnikov'), description: 'CBT session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c04', time: [11, 12], status: 'canceled', type: 'child' },
    { date: '2026-04-13', patient: P('Margarita Naumova'), description: 'Trauma therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c05', time: [15, 16], status: 'canceled', type: 'individual' },
    { date: '2026-04-16', patient: P('Fedor Klimov'),     description: 'Depression follow-up.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c06', time: [8,  9],  status: 'canceled', type: 'individual' },
    { date: '2026-04-18', patient: P('Angelina Parfenova'), description: 'Stress management.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c07', time: [14, 15], status: 'canceled', type: 'teen' },
    { date: '2026-04-21', patient: P('Gleb Sobolev'),     description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c08', time: [12, 13], status: 'canceled', type: 'couple' },
    { date: '2026-04-24', patient: P('Lyudmila Grishina'), description: 'Grief counseling.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c09', time: [10, 11], status: 'canceled', type: 'individual' },
    { date: '2026-04-26', patient: P('Artur Davydov'),    description: 'Anger management.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-c10', time: [16, 17], status: 'canceled', type: 'child' },

    // ─── April 28–30 — upcoming / pending ────────────────────────────────────
    { date: '2026-04-28', patient: P('Alice Petrova'),   description: 'Morning consultation.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-065', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-17'), note: 'Transitioning to bi-weekly schedule. Patient stable. Monitoring for regression under exam stress.' },
    ]},
    { date: '2026-04-28', patient: P('Ivan Sokolov'),    description: 'Anxiety follow-up.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-066', time: [11, 12], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-17'), note: 'GAD-7: 8. Mild anxiety. Coping skills solid. Checking in on job situation progress.' },
    ]},
    { date: '2026-04-28', patient: P('Maria Volkova'),   description: 'Couple session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-067', time: [13, 14], status: 'pending',  type: 'couple',    notes: [
        { date: ts('2026-04-14'), note: 'Monthly maintenance session. Couple doing well. Discuss plans for reducing frequency further.' },
    ]},
    { date: '2026-04-28', patient: P('Nikita Orlov'),    description: 'Phobia check-in.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-068', time: [15, 16], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-24'), note: 'Final exposure step: interact with live spider (under controlled conditions). Discharge likely after this session.' },
    ]},
    { date: '2026-04-29', patient: P('Tatiana Belova'),  description: 'Grief session.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-069', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-25'), note: 'Termination session. Grief work complete. Reminisce on progress, confirm relapse prevention plan.' },
    ]},
    { date: '2026-04-29', patient: P('Maxim Pavlov'),    description: 'Sleep disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-070', time: [11, 12], status: 'pending',  type: 'individual', notes: [
        { date: ts('2026-04-20'), note: 'CBT-I complete. Sleep efficiency 85%. Sleep window normalized. Final session to consolidate gains.' },
    ]},
    { date: '2026-04-29', patient: P('Daria Tikhonova'), description: 'Child therapy.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-071', time: [14, 15], status: 'upcoming', type: 'child',     notes: [
        { date: ts('2026-04-22'), note: 'Separation anxiety: full days at school now. Parent reports no morning refusals this week. Great progress.' },
    ]},
    { date: '2026-04-29', patient: P('Denis Korolev'),   description: 'Teen counseling.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-072', time: [16, 17], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-04-15'), note: 'Exam stress worsening. Perfectionism and catastrophizing. Implementing time-boxing and self-compassion practices.' },
        { date: ts('2026-04-22'), note: 'Somewhat calmer after reframing failure. Practice exam went better than expected — used as evidence against catastrophic thinking.' },
    ]},
    { date: '2026-04-29', patient: P('Denis Korolev'),   description: 'Teen counseling.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-072b', time: [20, 21], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-04-15'), note: 'Exam stress worsening. Perfectionism and catastrophizing. Implementing time-boxing and self-compassion practices.' },
        { date: ts('2026-04-22'), note: 'Somewhat calmer after reframing failure. Practice exam went better than expected — used as evidence against catastrophic thinking.' },
    ]},
    { date: '2026-04-30', patient: P('Andrey Zaytsev'),  description: 'OCD follow-up.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-073', time: [10, 11], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-04-22'), note: 'ERP progressing well. Compulsion frequency down 60%. Introducing more challenging hierarchy items.' },
    ]},
    { date: '2026-04-30', patient: P('Yulia Stepanova'), description: 'Burnout review.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-074', time: [12, 13], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-27'), note: 'Fully recovered from burnout. Maintenance session focus: sustaining healthy boundaries long-term.' },
    ]},
    { date: '2026-04-30', patient: P('Roman Alekseev'),  description: 'Family therapy.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-075', time: [14, 15], status: 'pending',  type: 'couple',    notes: [
        { date: ts('2026-04-23'), note: 'Couple in conflict again over finances. Returning to structured problem-solving protocol from session 3.' },
    ]},
    { date: '2026-04-30', patient: P('Polina Voronova'), description: 'Anxiety session.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'apr-076', time: [16, 17], status: 'canceled', type: 'couple' },

    // ─── May 2026 ─────────────────────────────────────────────────────────────
    { date: '2026-05-01', patient: P('Alice Petrova'),   description: 'Monthly review.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-001', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-28'), note: 'Bi-weekly check-in. Anxiety well managed. Discuss possibility of termination in 2–3 sessions.' },
    ]},
    { date: '2026-05-01', patient: P('Mikhail Egorov'),  description: 'OCD check-in.',          meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-002', time: [11, 12], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-04-24'), note: 'OCD compulsions now minimal. Continuing ERP maintenance. Patient proud of progress.' },
    ]},
    { date: '2026-05-01', patient: P('Svetlana Guseva'), description: 'Trauma integration.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-003', time: [14, 15], status: 'pending',  type: 'individual' },
    { date: '2026-05-04', patient: P('Ivan Sokolov'),    description: 'Anxiety session.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-004', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-28'), note: 'GAD-7: 6. Significant improvement. Discussing move to monthly sessions.' },
    ]},
    { date: '2026-05-04', patient: P('Maria Volkova'),   description: 'Cognitive therapy.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-005', time: [11, 12], status: 'upcoming', type: 'couple' },
    { date: '2026-05-04', patient: P('Artem Sidorov'),   description: 'Child behavioral.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-006', time: [13, 14], status: 'upcoming', type: 'child',     notes: [
        { date: ts('2026-04-27'), note: 'ADHD: impulse control improving with reward system. Teacher reports fewer disruptions in class.' },
    ]},
    { date: '2026-05-04', patient: P('Viktor Romanov'),  description: 'Anger management.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-007', time: [15, 16], status: 'pending',  type: 'couple' },
    { date: '2026-05-05', patient: P('Olga Smirnova'),   description: 'Depression session.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-008', time: [8,  9],  status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-28'), note: 'PHQ-9: 5 (minimal). Patient discussing ending therapy. Relapse prevention plan review needed.' },
    ]},
    { date: '2026-05-05', patient: P('Pavel Morozov'),   description: 'Stress management.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-009', time: [10, 11], status: 'upcoming', type: 'teen' },
    { date: '2026-05-05', patient: P('Natalia Volkov'),  description: 'Panic disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-010', time: [13, 14], status: 'canceled', type: 'teen',      notes: [
        { date: ts('2026-04-29'), note: 'Panic-free for 3 weeks. Considering discharge after this session.' },
    ]},
    { date: '2026-05-06', patient: P('Elena Kozlova'),   description: 'Trauma therapy.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-011', time: [9,  10], status: 'upcoming', type: 'individual' },
    { date: '2026-05-06', patient: P('Sergey Novikov'),  description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-012', time: [11, 12], status: 'upcoming', type: 'couple',   notes: [
        { date: ts('2026-04-29'), note: 'Couple maintaining gains. Monthly check-in. Focus: navigating differences in parenting style.' },
    ]},
    { date: '2026-05-06', patient: P('Ksenia Popova'),   description: 'Monthly check-in.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-013', time: [14, 15], status: 'pending',  type: 'individual', notes: [
        { date: ts('2026-04-29'), note: 'Social anxiety: completed behavioral experiment (joined a group lunch). Anxiety manageable. Strong outcome.' },
    ]},
    { date: '2026-05-07', patient: P('Anna Fedorova'),   description: 'CBT session.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-014', time: [10, 11], status: 'upcoming', type: 'child',     notes: [
        { date: ts('2026-04-30'), note: 'Selective mutism: now responds verbally to direct questions from teacher. School integration close to normal.' },
    ]},
    { date: '2026-05-07', patient: P('Nikita Orlov'),    description: 'Phobia treatment.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-015', time: [12, 13], status: 'upcoming', type: 'individual' },
    { date: '2026-05-07', patient: P('Daria Tikhonova'), description: 'Child therapy.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-016', time: [15, 16], status: 'canceled', type: 'child' },
    { date: '2026-05-08', patient: P('Tatiana Belova'),  description: 'Grief counseling.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-017', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-04-29'), note: 'Formal termination session. Patient thriving. Provided written summary of treatment and coping strategies.' },
    ]},
    { date: '2026-05-08', patient: P('Andrey Zaytsev'),  description: 'OCD therapy.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-018', time: [11, 12], status: 'upcoming', type: 'teen' },
    { date: '2026-05-08', patient: P('Alexey Baranov'),  description: 'Burnout counseling.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-019', time: [14, 15], status: 'pending',  type: 'individual', notes: [
        { date: ts('2026-04-28'), note: 'New patient: executive burnout. Very high perfectionism. Initial assessment: moderate burnout, no depression.' },
    ]},
    { date: '2026-05-11', patient: P('Yulia Stepanova'), description: 'Burnout session.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-020', time: [9,  10], status: 'upcoming', type: 'individual' },
    { date: '2026-05-11', patient: P('Viktor Romanov'),  description: 'Anger management.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-021', time: [11, 12], status: 'upcoming', type: 'couple',    notes: [
        { date: ts('2026-05-04'), note: 'Anger outbursts less frequent. Partner notices change. Working on pause-and-reflect technique before responding.' },
    ]},
    { date: '2026-05-11', patient: P('Maxim Pavlov'),    description: 'Sleep disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-022', time: [13, 14], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-01'), note: 'Post-CBT-I follow-up. Sleep efficiency maintained at 83%. No relapse. Discuss if follow-up needed.' },
    ]},
    { date: '2026-05-11', patient: P('Grigory Nikitin'), description: 'Session review.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-023', time: [15, 16], status: 'canceled', type: 'child' },
    { date: '2026-05-12', patient: P('Natalia Volkov'),  description: 'Panic disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-024', time: [8,  9],  status: 'upcoming', type: 'teen' },
    { date: '2026-05-12', patient: P('Roman Alekseev'),  description: 'Family therapy.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-025', time: [10, 11], status: 'upcoming', type: 'couple',    notes: [
        { date: ts('2026-04-30'), note: 'Financial conflict addressed with structured problem-solving. Short-term: create shared budget together as homework.' },
    ]},
    { date: '2026-05-12', patient: P('Polina Voronova'), description: 'Anxiety follow-up.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-026', time: [13, 14], status: 'pending',  type: 'couple' },
    { date: '2026-05-13', patient: P('Mikhail Egorov'),  description: 'OCD follow-up.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-027', time: [9,  10], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-05-06'), note: 'OCD in full remission. Discussing transition to quarterly check-ins only.' },
    ]},
    { date: '2026-05-13', patient: P('Svetlana Guseva'), description: 'Trauma session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-028', time: [11, 12], status: 'upcoming', type: 'individual' },
    { date: '2026-05-13', patient: P('Denis Korolev'),   description: 'Teen counseling.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-029', time: [14, 15], status: 'canceled', type: 'teen' },
    { date: '2026-05-14', patient: P('Alice Petrova'),   description: 'Weekly session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-030', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-01'), note: 'Patient proactively used coping tools during stressful week. Ready to discuss termination timeline.' },
    ]},
    { date: '2026-05-14', patient: P('Artem Sidorov'),   description: 'Child behavioral.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-031', time: [11, 12], status: 'upcoming', type: 'child' },
    { date: '2026-05-14', patient: P('Veronika Moiseeva'), description: 'Trauma therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-032', time: [13, 14], status: 'pending',  type: 'individual', notes: [
        { date: ts('2026-05-07'), note: 'Somatic symptoms reduced. Chest tension now only during stress triggers. Continuing body-scan practice.' },
    ]},
    { date: '2026-05-14', patient: P('Ludmila Fomina'),  description: 'CBT follow-up.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-033', time: [15, 16], status: 'upcoming', type: 'couple' },
    { date: '2026-05-15', patient: P('Ivan Sokolov'),    description: 'Anxiety check-in.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-034', time: [10, 11], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-04'), note: 'Monthly session agreed. Patient self-managing well. Main focus now: career growth anxiety.' },
    ]},
    { date: '2026-05-15', patient: P('Maria Volkova'),   description: 'Cognitive therapy.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-035', time: [12, 13], status: 'upcoming', type: 'couple' },
    { date: '2026-05-15', patient: P('Dmitry Lebedev'),  description: 'Family counseling.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-036', time: [14, 15], status: 'canceled', type: 'couple' },
    { date: '2026-05-18', patient: P('Olga Smirnova'),   description: 'Depression follow-up.',  meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-037', time: [9,  10], status: 'upcoming', type: 'individual' },
    { date: '2026-05-18', patient: P('Pavel Morozov'),   description: 'Stress session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-038', time: [11, 12], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-05-11'), note: 'Exam period over. Stress resolved naturally. Reviewing whether to continue or terminate.' },
    ]},
    { date: '2026-05-18', patient: P('Elena Kozlova'),   description: 'Trauma therapy.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-039', time: [13, 14], status: 'pending',  type: 'individual' },
    { date: '2026-05-18', patient: P('Ksenia Popova'),   description: 'Check-in session.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-040', time: [15, 16], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-06'), note: 'Social anxiety in remission. Attending weekly group events independently. Termination in sight.' },
    ]},
    { date: '2026-05-19', patient: P('Sergey Novikov'),  description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-041', time: [8,  9],  status: 'upcoming', type: 'couple' },
    { date: '2026-05-19', patient: P('Anna Fedorova'),   description: 'CBT session.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-042', time: [10, 11], status: 'upcoming', type: 'child',     notes: [
        { date: ts('2026-05-12'), note: 'Selective mutism: reads aloud in front of small group. Near full resolution. 1–2 sessions to termination.' },
    ]},
    { date: '2026-05-19', patient: P('Nikita Orlov'),    description: 'Phobia treatment.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-043', time: [13, 14], status: 'canceled', type: 'individual' },
    { date: '2026-05-20', patient: P('Tatiana Belova'),  description: 'Grief counseling.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-044', time: [9,  10], status: 'upcoming', type: 'individual' },
    { date: '2026-05-20', patient: P('Andrey Zaytsev'),  description: 'OCD therapy.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-045', time: [11, 12], status: 'upcoming', type: 'teen',      notes: [
        { date: ts('2026-05-13'), note: 'Quarterly check-in agreed. No active OCD symptoms. Patient confident in self-management.' },
    ]},
    { date: '2026-05-20', patient: P('Yulia Stepanova'), description: 'Burnout review.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-046', time: [14, 15], status: 'pending',  type: 'individual' },
    { date: '2026-05-21', patient: P('Viktor Romanov'),  description: 'Anger management.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-047', time: [10, 11], status: 'upcoming', type: 'couple',    notes: [
        { date: ts('2026-05-14'), note: 'Partner confirmed: anger incidents stopped. Couple satisfied with progress. Wrap-up session planned.' },
    ]},
    { date: '2026-05-21', patient: P('Maxim Pavlov'),    description: 'Sleep disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-048', time: [13, 14], status: 'upcoming', type: 'individual' },
    { date: '2026-05-21', patient: P('Daria Tikhonova'), description: 'Child therapy.',         meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-049', time: [15, 16], status: 'canceled', type: 'child',     notes: [
        { date: ts('2026-05-14'), note: 'Separation anxiety fully resolved. School attendance 100%. Session canceled by parent — no longer needed.' },
    ]},
    { date: '2026-05-22', patient: P('Natalia Volkov'),  description: 'Panic disorder.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-050', time: [9,  10], status: 'upcoming', type: 'teen' },
    { date: '2026-05-22', patient: P('Roman Alekseev'),  description: 'Family session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-051', time: [11, 12], status: 'upcoming', type: 'couple',    notes: [
        { date: ts('2026-05-12'), note: 'Shared budget created and followed for 2 weeks. Conflict resolution skills generalizing. Very positive.' },
    ]},
    { date: '2026-05-25', patient: P('Alice Petrova'),   description: 'Weekly session.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-052', time: [9,  10], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-14'), note: 'Termination agreed for end of May. Patient to use self-help resources. Provided list of support contacts.' },
    ]},
    { date: '2026-05-25', patient: P('Mikhail Egorov'),  description: 'OCD therapy.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-053', time: [11, 12], status: 'upcoming', type: 'teen' },
    { date: '2026-05-25', patient: P('Polina Voronova'), description: 'Anxiety session.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-054', time: [13, 14], status: 'pending',  type: 'couple',    notes: [
        { date: ts('2026-05-19'), note: 'Attachment-based work ongoing. Partner also showing avoidant patterns. Both doing individual work in parallel.' },
    ]},
    { date: '2026-05-25', patient: P('Alexey Baranov'),  description: 'Burnout counseling.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-055', time: [15, 16], status: 'canceled', type: 'individual' },
    { date: '2026-05-26', patient: P('Ivan Sokolov'),    description: 'Anxiety follow-up.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-056', time: [8,  9],  status: 'upcoming', type: 'individual' },
    { date: '2026-05-26', patient: P('Maria Volkova'),   description: 'Cognitive therapy.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-057', time: [10, 11], status: 'upcoming', type: 'couple',    notes: [
        { date: ts('2026-05-19'), note: 'Monthly couple check-in. Relationship stable. No active issues. Celebrating 6-month therapy anniversary.' },
    ]},
    { date: '2026-05-26', patient: P('Grigory Nikitin'), description: 'Closing session.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-058', time: [13, 14], status: 'upcoming', type: 'child' },
    { date: '2026-05-27', patient: P('Dmitry Lebedev'),  description: 'Family counseling.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-059', time: [9,  10], status: 'upcoming', type: 'couple' },
    { date: '2026-05-27', patient: P('Olga Smirnova'),   description: 'Depression session.',    meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-060', time: [11, 12], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-08'), note: 'Final session. PHQ-9: 3. Full remission. Relapse prevention plan in place. Formal discharge.' },
    ]},
    { date: '2026-05-27', patient: P('Veronika Moiseeva'), description: 'Trauma therapy.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-061', time: [14, 15], status: 'pending',  type: 'individual', notes: [
        { date: ts('2026-05-20'), note: 'Childhood trauma narrative fully processed. Somatic symptoms resolved. Working on post-traumatic growth.' },
    ]},
    { date: '2026-05-28', patient: P('Pavel Morozov'),   description: 'Stress management.',     meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-062', time: [10, 11], status: 'upcoming', type: 'teen' },
    { date: '2026-05-28', patient: P('Elena Kozlova'),   description: 'Trauma therapy.',        meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-063', time: [12, 13], status: 'upcoming', type: 'individual', notes: [
        { date: ts('2026-05-21'), note: 'Post-EMDR: no intrusive symptoms. Patient reconnecting with life goals. Discharge at next session.' },
    ]},
    { date: '2026-05-28', patient: P('Denis Korolev'),   description: 'Teen counseling.',       meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-064', time: [15, 16], status: 'canceled', type: 'teen' },
    { date: '2026-05-29', patient: P('Sergey Novikov'),  description: 'Relationship counseling.', meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-065', time: [9,  10], status: 'upcoming', type: 'couple' },
    { date: '2026-05-29', patient: P('Anna Fedorova'),   description: 'CBT session.',           meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-066', time: [11, 12], status: 'upcoming', type: 'child',     notes: [
        { date: ts('2026-05-22'), note: 'Final session for selective mutism. Full verbal participation at school. Discharge with 3-month follow-up planned.' },
    ]},
    { date: '2026-05-29', patient: P('Artem Sidorov'),   description: 'Child behavioral.',      meet_url: 'https://meet.google.com/abc-defg-hij', uid: 'may-067', time: [14, 15], status: 'pending',  type: 'child' },
];
