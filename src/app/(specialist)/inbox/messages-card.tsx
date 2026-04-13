'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Item, ItemDescription, ItemFooter, ItemHeader } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Circle } from 'lucide-react';
import { Message, messageTypeMeta } from './page';

function MessagesCard({ status, description, title, type, createdAt }: Message) {
  const { icon: Icon, color } = messageTypeMeta[type];
  return (
    <Item
      className={cn(
        'relative flex cursor-pointer flex-row flex-nowrap items-start justify-between overflow-hidden border-none bg-white shadow-[0_0_4px_0] shadow-black/15 transition-all *:basis-auto hover:brightness-97',
        status === 'seen' && 'opacity-50 hover:brightness-95'
      )}
    >
      <div
        className={cn(
          'absolute -top-0.5 left-0 h-6 w-2 -skew-x-45 bg-transparent',
          status === 'new' && 'bg-red-400'
        )}
      />
      <ItemHeader className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-9">
            <AvatarImage
              className="object-cover"
              src={
                'https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
              }
            />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <span className="text-base font-semibold">Steven Spielberg</span>
        </div>
        <span>{title}</span>
        <ItemDescription className="flex flex-row items-center gap-2 text-xs">
          <Circle size={4} className="fill-muted-foreground stroke-muted-foreground" />
          {description}
        </ItemDescription>
      </ItemHeader>
      <ItemFooter className="h-full flex-col items-end justify-between text-xs">
        <div className={cn('flex items-end gap-2 capitalize', color && color)}>
          {type}
          <Icon className="stroke-[1.25]" size={18} />
        </div>

        <span className="">{format(createdAt, 'dd/MM/yyyy')}</span>
      </ItemFooter>
    </Item>
  );
}

export default MessagesCard;
