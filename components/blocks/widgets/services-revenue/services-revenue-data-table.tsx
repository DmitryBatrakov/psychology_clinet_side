'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AnimatedNumberChange } from '../../motion/animated-number-change';
import { Typography } from '../../typography/typography';
import { RevenueService } from './columns';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ServicesRevenueDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div
      className={cn(
        'relative h-full w-full',
        '*:h-full *:max-h-full *:overflow-hidden *:rounded-md *:border *:border-dashed'
      )}
    >
      <Table className="relative h-full max-h-full table-fixed overflow-hidden">
        <TableHeader className="flex w-full border-b bg-slate-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="table w-full table-fixed border-none bg-transparent! *:text-center"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody
          className={cn(
            'h-full max-h-[calc(var(--widget-content-height)-149px)]',
            'custom-scrollbar flex w-full min-w-full flex-col overflow-y-auto transition-[max-height,min-height]'
          )}
        >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="table min-h-[48.4px] w-full table-fixed *:text-center"
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const key = cell.column.id as keyof RevenueService;

                  if (key === 'service')
                    return (
                      <Tooltip key={cell.id}>
                        <TooltipTrigger className="relative flex overflow-hidden" asChild>
                          <TableCell className="h-12 w-full items-center overflow-hidden pl-2 text-start text-ellipsis">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        </TooltipTrigger>
                        <TooltipContent>{cell.getValue<string>()}</TooltipContent>
                      </Tooltip>
                    );

                  if (key === 'share') {
                    const values = (data as RevenueService[]).map((entry) => entry[key]);
                    const point = Math.max(...values) / 2;
                    const step = point / 2;
                    const value = cell.getValue<number>();

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          'text-amber-400',
                          value >= point + step && 'text-emerald-600',
                          value <= point - step && 'text-destructive'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="table w-full table-fixed">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <TableFooter className="flex w-full border-b bg-slate-50 pr-2.5">
          <TableRow
            className={cn(
              'table w-full table-fixed border-none bg-transparent!',
              '*:text-center *:first:pl-4 *:first:text-start!'
            )}
          >
            {table.getAllColumns().map(({ id }) => {
              const key = id as keyof RevenueService;
              const value =
                key !== 'service' && key !== 'share'
                  ? (data as RevenueService[]).reduce((acc, entry) => {
                      return (acc += entry[key]);
                    }, 0)
                  : 0;

              if (key === 'service') return <TableCell key={id}>Total</TableCell>;
              if (key === 'share') return <TableCell key={id}>—</TableCell>;

              return (
                <TableCell key={id}>
                  <AnimatedNumberChange
                    value={value}
                    Component={Typography}
                    prefix={key === 'revenue' ? '$' : undefined}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
