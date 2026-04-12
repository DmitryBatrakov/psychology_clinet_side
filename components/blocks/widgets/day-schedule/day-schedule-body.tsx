'use client';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemHeader } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BookUser, Headset } from 'lucide-react';
import { mmToHHMM } from '../timeline/timeline-halpers';

const scheduleData = [
  {
    name: 'Bob Johnson',
    time: [420, 480], // 07:00–08:00
    description: 'Discussion of the main topics for today’s meeting.',
    meet_url: 'https://meet.google.com/abc-defg-hij',
    uid: 'mtg-001',
  },
  {
    name: 'Anna Cohen',
    time: [510, 555], // 08:30–09:15
    description: 'Weekly project status update and next steps.',
    meet_url: 'https://meet.google.com/kln-opqr-stu',
    uid: 'mtg-002',
  },
  {
    name: 'Alex Johnson',
    time: [570, 600], // 09:30–10:00
    description: 'Quick sync on current blockers and priorities.',
    meet_url: 'https://zoom.us/j/9348572345',
    uid: 'mtg-003',
  },
  {
    name: 'Maria Gonzales',
    time: [630, 690], // 10:30–11:30
    description: 'Client meeting to review progress and feedback.',
    meet_url: 'https://teams.microsoft.com/l/meetup-join/123',
    uid: 'mtg-004',
  },
  {
    name: 'Daniel Smith',
    time: [720, 750], // 12:00–12:30
    description: 'Planning session for upcoming sprint tasks.',
    meet_url: 'https://meet.google.com/spr-int-plan',
    uid: 'mtg-005',
  },
  {
    name: 'Sophie Müller',
    time: [780, 840], // 13:00–14:00
    description: 'Design review and alignment on UI decisions.',
    meet_url: 'https://zoom.us/j/8837461123',
    uid: 'mtg-006',
  },
  {
    name: 'Liam O’Connor',
    time: [870, 900], // 14:30–15:00
    description: 'One-on-one check-in and feedback discussion.',
    meet_url: 'https://meet.google.com/one-on-one',
    uid: 'mtg-007',
  },
  {
    name: 'Emma Wilson',
    time: [930, 990], // 15:30–16:30
    description: 'Team retrospective and process improvements.',
    meet_url: 'https://teams.microsoft.com/l/meetup-join/456',
    uid: 'mtg-008',
  },
  {
    name: 'Noah Brown',
    time: [1020, 1050], // 17:00–17:30
    description: 'Brief alignment call before end of day.',
    meet_url: 'https://meet.google.com/eod-sync',
    uid: 'mtg-009',
  },
  {
    name: 'Olivia Martin',
    time: [1080, 1140], // 18:00–19:00
    description: 'Roadmap discussion and long-term planning.',
    meet_url: 'https://zoom.us/j/7712349981',
    uid: 'mtg-010',
  },
];

function DayScheduleBody() {
  return (
    <ScrollArea className="relative h-[calc(var(--widget-content-height)-59px)] w-full py-3 pr-3">
      <div className="flex max-w-full min-w-0 flex-col gap-2 overflow-hidden pb-px">
        {true &&
          scheduleData.map(({ name, time: [s, e], description }, i) => (
            <Item
              key={`meeting-${i}`}
              className="border-input relative flex min-h-0 min-w-0 flex-col justify-between gap-1 overflow-hidden border *:w-full"
            >
              <ItemHeader className="w-full min-w-0">
                <div className="grid w-full min-w-0 grid-cols-[1fr_166px] items-center justify-between gap-2 overflow-hidden">
                  <span className="min-w-0 truncate">{name}</span>

                  <ItemDescription className="shrink-0 text-xs whitespace-nowrap underline underline-offset-2">
                    From: {mmToHHMM(s)} — To: {mmToHHMM(e)}
                  </ItemDescription>
                </div>
              </ItemHeader>
              <ItemContent className="text-muted-foreground line-clamp-1 text-xs text-[11px]">
                <p>{description}</p>
              </ItemContent>
              <Separator />

              <ItemFooter className="mt-2 min-w-0 flex-1 *:h-6.5 *:flex-1 *:rounded-sm *:text-xs">
                <Button variant={'secondary'} size={'sm'} className="cursor-pointer">
                  <BookUser className="size-3" />
                  <span>Details</span>
                </Button>
                <Button
                  size={'sm'}
                  className="cursor-pointer bg-green-300! text-black hover:brightness-95"
                >
                  <Headset className="size-3" />
                  <span>Join</span>
                </Button>
              </ItemFooter>
            </Item>
          ))}
      </div>
    </ScrollArea>
  );
}

export default DayScheduleBody;
