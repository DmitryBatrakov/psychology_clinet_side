import { VisitRecordStatus } from '@/features/calendar/model/types';

export function getSessionStatus(status: VisitRecordStatus | undefined) {
    return {
        isPending: status === 'pending',
        isCompleted: status === 'completed',
        isCanceled: status === 'canceled',
    };
}
