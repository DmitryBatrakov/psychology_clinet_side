'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronsUpDown } from 'lucide-react';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { Typography } from '../../typography/typography';

export type ClientLTV = {
  client: string;
  visits: number;
  last_appt: Date;
  no_show: number;
};

export const columns: ColumnDef<ClientLTV>[] = [
  {
    header: () => (
      <div className="w-full overflow-hidden pl-2 text-start text-ellipsis">Client</div>
    ),
    accessorKey: 'client',
    cell: ({ getValue }) => {
      return (
        <div className="w-full overflow-hidden pl-2 text-start text-ellipsis">
          {getValue<string>()}
        </div>
      );
    },
  },
  {
    accessorKey: 'visits',
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
          <span>Visits</span>
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
    accessorKey: 'last_appt',
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
          <span>Last Appt</span>
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
    cell: ({ getValue }) => format(getValue<Date>(), 'eee d MMM'),
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
          <span>No-show</span>
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

    accessorKey: 'no_show',
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
