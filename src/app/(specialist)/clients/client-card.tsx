'use client';
import { AnimatedNumberChange } from '@/components/blocks/motion/animated-number-change';
import { TypographySmall } from '@/components/blocks/typography/typography-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import {
  AlertCircle,
  Bot,
  Crown,
  EllipsisVertical,
  LucideIcon,
  Notebook,
  PenBox,
  PenToolIcon,
  Pin,
  ShieldAlert,
  Trash2,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';

type StatusColors = 'blue' | 'amber' | 'emerald' | 'fuchsia' | 'red';
type ClientStatus = 'regular' | 'new' | 'demanding' | 'VIP';
type RadioCategories = ClientStatus | 'all';

const StatusColorsObject: Record<RadioCategories, StatusColors> = {
  all: 'blue',
  VIP: 'fuchsia',
  new: 'emerald',
  demanding: 'red',
  regular: 'amber',
};

type Client = {
  name: string;
  phone: string;
  income: number;
  lastVisit: Date;
  totalVisits: number;
  description: string;
  status: ClientStatus;
  isAIAssists: boolean;
};

function ClientCard({
  name,
  phone,
  status,
  income,
  lastVisit,
  totalVisits,
  description,
  isAIAssists,
}: Client) {
  return (
    <Card className="gap-3 overflow-hidden border-none p-0 shadow-[0_0_4px_0] shadow-black/15">
      <CardHeader className="flex justify-between p-3 pb-0">
        <div className="flex items-center gap-3">
          <Avatar
            className={cn(
              StatusColorsObject[status] === 'blue' && 'text-blue-600 *:bg-blue-100',
              StatusColorsObject[status] === 'amber' && 'text-amber-600 *:bg-amber-100',
              StatusColorsObject[status] === 'emerald' && 'text-emerald-600 *:bg-emerald-100',
              StatusColorsObject[status] === 'fuchsia' && 'text-fuchsia-600 *:bg-fuchsia-100',
              StatusColorsObject[status] === 'red' && 'text-red-600 *:bg-red-100',
              'size-12'
            )}
          >
            <AvatarImage />
            <AvatarFallback className="text-lg">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm">{name}</CardTitle>
            <Link href={`tel:${phone}`} className="cursor-pointer">
              <CardDescription className="text-sm">{phone}</CardDescription>
            </Link>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'icon'} className="cursor-pointer" variant={'ghost'}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup className="*:cursor-pointer">
              <DropdownMenuItem>
                <PenBox />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="flex grow flex-col gap-3 px-3">
        <span
          className={cn(
            'bg-muted border-border flex grow flex-col gap-1 rounded-sm border p-2 text-xs',
            status === 'demanding' && 'text-destructive bg-destructive/10 border-destructive/10',
            isAIAssists && 'border-sky-600/10 bg-sky-600/10 text-sky-600'
          )}
        >
          {isAIAssists && (
            <b className="flex items-center gap-1 uppercase">
              <Bot size={14} />
              AI Note
            </b>
          )}
          {status === 'demanding' && (
            <b className="flex items-center gap-1 uppercase">
              <AlertCircle size={14} /> Requires Attention
            </b>
          )}
          {!isAIAssists && status !== 'demanding' && (
            <b className="flex items-center gap-1 uppercase">
              <PenToolIcon size={14} /> Note
            </b>
          )}
          <p className="grow rounded-sm">"{description}"</p>
        </span>
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between gap-2">
            <span className="text-muted-foreground text-xs">Last Visit</span>
            <TypographySmall className="h-[18.4px]">
              {format(lastVisit, 'dd MMM yyyy')}
            </TypographySmall>
          </div>

          <div className="flex flex-col gap-0.75">
            <span className="text-muted-foreground text-xs">Total Visits</span>
            <span className="">
              <AnimatedNumberChange
                fixed={0}
                startValue={0}
                value={totalVisits}
                Component={TypographySmall}
              />{' '}
              (
              <AnimatedNumberChange
                fixed={0}
                prefix="$"
                startValue={0}
                value={income}
                Component={TypographySmall}
              />
              )
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-border flex items-end justify-between border-t p-3!">
        <Badge
          className={cn(
            StatusColorsObject[status] === 'blue' && 'bg-blue-200 text-blue-600',
            StatusColorsObject[status] === 'amber' && 'bg-amber-200 text-amber-600',
            StatusColorsObject[status] === 'emerald' && 'bg-emerald-200 text-emerald-600',
            StatusColorsObject[status] === 'fuchsia' && 'bg-fuchsia-200 text-fuchsia-600',
            StatusColorsObject[status] === 'red' && 'bg-red-200 text-red-600',
            'rounded-sm text-xs capitalize'
          )}
        >
          {status}
        </Badge>

        <Button
          size={'sm'}
          variant={'link'}
          className="h-auto cursor-pointer text-xs font-semibold"
        >
          History 👉
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ClientCard;
