'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronsUpDown } from 'lucide-react';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { Typography } from '../../typography/typography';

export type RevenueService = {
  service: string;
  revenue: number;
  appts: number;
  share: number;
};

export const columns: ColumnDef<RevenueService>[] = [
  {
    header: () => (
      <div className="w-full overflow-hidden pl-2 text-start text-ellipsis">Service</div>
    ),
    accessorKey: 'service',
    cell: ({ getValue }) => {
      return (
        <div className="w-full overflow-hidden pl-2 text-start text-ellipsis">
          {getValue<string>()}
        </div>
      );
    },
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button
          size={'sm'}
          variant={'ghost'}
          className="cursor-pointer"
          onClick={() => {
            if (sorted === 'asc') column.clearSorting();
            else column.toggleSorting(!Boolean(column.getIsSorted() === 'desc'));
          }}
        >
          <span>Revenue</span>
          {sorted ? (
            sorted === 'asc' ? (
              <ArrowUpNarrowWide />
            ) : (
              <ArrowDownWideNarrow />
            )
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <AnimatedNumberChange Component={Typography} value={getValue<number>()} prefix="$" />
    ),
  },
  {
    accessorKey: 'appts',
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button
          size={'sm'}
          variant={'ghost'}
          className="cursor-pointer"
          onClick={() => {
            if (sorted === 'asc') column.clearSorting();
            else column.toggleSorting(!Boolean(column.getIsSorted() === 'desc'));
          }}
        >
          <span>Appts</span>
          {sorted ? (
            sorted === 'asc' ? (
              <ArrowUpNarrowWide />
            ) : (
              <ArrowDownWideNarrow />
            )
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => (
      <AnimatedNumberChange Component={Typography} value={getValue<number>()} />
    ),
  },

  {
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button
          size={'sm'}
          variant={'ghost'}
          className="full cursor-pointer"
          onClick={() => {
            if (sorted === 'asc') column.clearSorting();
            else column.toggleSorting(!Boolean(column.getIsSorted() === 'desc'));
          }}
        >
          <span>Share</span>
          {sorted ? (
            sorted === 'asc' ? (
              <ArrowUpNarrowWide />
            ) : (
              <ArrowDownWideNarrow />
            )
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },

    accessorKey: 'share',
    cell: ({ getValue }) => (
      <AnimatedNumberChange
        postfix="%"
        className=""
        Component={Typography}
        value={getValue<number>()}
      />
    ),
  },
];
