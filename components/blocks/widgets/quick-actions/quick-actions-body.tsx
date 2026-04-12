import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Bell,
  CalendarPlus,
  LucideIcon,
  Megaphone,
  SendToBack,
  Shredder,
  UserPlus,
} from 'lucide-react';

type Action = {
  icon: LucideIcon;
  title: string;
  action: () => void;
  color: { text: string; bg: string };
};

const actions: Action[] = [
  {
    icon: CalendarPlus,
    title: 'New Booking',
    action: () => console.log('trigger'),
    color: { text: 'text-green-500', bg: 'bg-green-100!' },
  },
  {
    icon: UserPlus,
    title: 'Add client',
    action: () => console.log('trigger'),
    color: { text: 'text-blue-500', bg: 'bg-blue-100!' },
  },
  {
    icon: SendToBack,
    title: 'Transfer',
    action: () => console.log('trigger'),
    color: { text: 'text-violet-500', bg: 'bg-violet-100!' },
  },
  {
    icon: Megaphone,
    title: 'Fill gap',
    action: () => console.log('trigger'),
    color: { text: 'text-orange-500', bg: 'bg-orange-100!' },
  },
  {
    icon: Bell,
    title: 'Remind',
    action: () => console.log('trigger'),
    color: { text: 'text-amber-500', bg: 'bg-amber-100!' },
  },
  {
    icon: Shredder,
    title: 'Cancellation',
    action: () => console.log('trigger'),
    color: { text: 'text-red-500', bg: 'bg-red-100!' },
  },
];

function QuickActionsBody() {
  return (
    <div className="grid size-full grid-cols-3 gap-2">
      {actions.map(({ action, title, icon: Icon, color }, index) => {
        return (
          <Button
            onClick={action}
            variant={'secondary'}
            key={`action-${title}-${index}`}
            className={cn(
              'h-full cursor-pointer flex-col hover:brightness-98 active:brightness-96',
              color.bg,
              color.text
            )}
          >
            <Icon className="size-6" />
            <span>{title}</span>
          </Button>
        );
      })}
    </div>
  );
}

export default QuickActionsBody;
