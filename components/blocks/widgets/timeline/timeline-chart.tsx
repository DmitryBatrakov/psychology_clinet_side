'use client';
import { Button } from '@/components/ui/button';
import { ItemContent, ItemHeader } from '@/components/ui/item';
import { cn } from '@/lib/utils';
import { ScanEye, Undo2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  BarProps,
  CartesianGrid,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { colorByOutcome, timelineData, TimelineRow } from './timeline';
import TimelineChartSkeleton from './timeline-chart-skeleton';
import { mmToHHMM } from './timeline-halpers';
import TimelineTooltip from './timeline-tooltip';

interface Props {
  label?: string;
  isResizing: boolean;
  onReturn?: () => void;
}

type ShapeProps = BarProps & { payload?: TimelineRow };

function TimelineChart({ isResizing, label, onReturn }: Props) {
  const dataWithIndex = useMemo(
    () =>
      timelineData.map((row, i) => ({
        ...row,
        rowIndex: i,
      })),
    [timelineData]
  );

  const [width, setWidth] = useState(0);
  const pxPerHour = width / 24;
  const hourLabelStep =
    pxPerHour < 20 ? 6 : pxPerHour < 25 ? 4 : pxPerHour < 30 ? 3 : pxPerHour < 40 ? 2 : 1;

  return (
    <AnimatePresence mode="wait">
      <ItemHeader className="w-full basis-0 font-semibold">
        <span className="flex items-center gap-2">
          <ScanEye size={18} />
          {label}
        </span>

        <Button size={'icon'} variant={'outline'} className="cursor-pointer" onClick={onReturn}>
          <Undo2 />
        </Button>
      </ItemHeader>

      {!isResizing ? (
        <motion.div
          key={'timeline-chart'}
          className="flex h-full w-full flex-1 flex-col gap-2"
          animate={{ opacity: isResizing ? 0 : 1 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ItemContent className={cn('h-full min-h-0 overflow-hidden **:outline-0')}>
            <ResponsiveContainer width="100%" height="100%" onResize={(w) => setWidth(w)}>
              <BarChart
                layout="vertical"
                barCategoryGap={0}
                data={dataWithIndex}
                margin={{ left: 24, right: 24 }}
              >
                <TimelineTooltip />

                {dataWithIndex.map((row) => (
                  <ReferenceLine
                    key={row.name}
                    y={row.rowIndex + 0.5}
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                  />
                ))}

                <XAxis
                  type="number"
                  domain={[0, 1440]}
                  ticks={Array.from({ length: 25 }, (_, i) => i * 60)}
                  interval={0}
                  tick={({ x, y, payload, index }: any) => {
                    const hour = payload.value / 60;
                    const showText = hour % hourLabelStep === 0;

                    return (
                      <g transform={`translate(${x},${y})`}>
                        {showText ? (
                          <text y={10} textAnchor="middle" fill="#374151" fontSize={11}>
                            {mmToHHMM(payload.value)}
                          </text>
                        ) : (
                          <line y1={2} y2={6} stroke="#9ca3af" strokeWidth={1} />
                        )}
                      </g>
                    );
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="rowIndex"
                  domain={[-0.5, dataWithIndex.length - 0.5]}
                  tick={false}
                  width={0}
                />

                <CartesianGrid vertical horizontal={false} stroke="#e5e7eb" strokeDasharray="4 4" />
                <Bar
                  radius={1}
                  dataKey="first"
                  shape={(props: ShapeProps) => {
                    const outcome = props.payload?.outcome ?? 'pending';
                    return <Rectangle {...(props as any)} fill={colorByOutcome[outcome]} />;
                  }}
                  activeBar={(props: ShapeProps) => {
                    const outcome = props.payload?.outcome ?? 'pending';
                    return (
                      <Rectangle
                        {...(props as any)}
                        fill={colorByOutcome[outcome]}
                        stroke="#f59e0b"
                        strokeWidth={2}
                      />
                    );
                  }}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </ItemContent>
        </motion.div>
      ) : (
        <motion.div
          key={'timeline-chart-skeleton'}
          className={cn('flex size-full flex-1 flex-col', isResizing && 'blur-xs')}
          animate={{ opacity: isResizing ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <TimelineChartSkeleton length={timelineData.length} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TimelineChart;
