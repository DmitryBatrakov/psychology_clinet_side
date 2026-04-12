'use client';
import DaySchedule from '@/components/blocks/widgets/day-schedule/day-schedule';
import Pipeline from '@/components/blocks/widgets/pipeline/pipeline';
import { AnyBlockConfig } from '@/components/blocks/widgets/pipeline/pipeline-body';
import QuickActions from '@/components/blocks/widgets/quick-actions/quick-actions';
import { useEffect, useRef, useState } from 'react';

const PipelineBlocks: AnyBlockConfig[] = [
  {
    type: 'Income',
    props: {
      hours: { prev: 120, value: 145 },
      income: { prev: 2040, value: 3880 },
      title: 'Income',
      mode: 'total',
    },
  },
  {
    type: 'Expected',
    props: {
      prev: 800,
      value: 1020,
      title: 'Expected',
    },
  },
  {
    type: 'Orders',
    props: {
      prev: 8,
      value: 10,
      title: 'Orders',
    },
  },
  {
    type: 'Cancelation',
    props: {
      prev: 1,
      value: 2,
      title: 'Cancelation',
    },
  },
  {
    type: 'Conversion',
    props: {
      leads: 42,
      bookings: 18,
      title: 'Conversion',
    },
  },
];

export default function Dashboard() {
  const [height, setHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    if (!container || !header) return;

    const observer = new ResizeObserver(() => {
      setHeight(container.clientHeight - header.clientHeight);
    });

    observer.observe(container);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);
  return (
    <div
      
      className="custom-scrollbar min-h-screen relative flex min-w-210 flex-1 flex-col items-start gap-2 p-2 will-change-[wight]"
    >
      <div  className="w-full">
        <Pipeline className="w-full" blocks={PipelineBlocks} />
      </div>
      <div
        style={{
          height: height ? `${height}px` : '',
        }}
        className="grid min-h-152 w-full grid-cols-2 grid-rows-2 gap-2"
      >
        <QuickActions className="row-start-2" />
        {/* <AITip className="" /> */}
        <DaySchedule className="row-span-2" />
      </div>
    </div>
  );
}




// 'use client';
// import AITip from '@/components/blocks/widgets/ai-tip/ai-tip';
// import DaySchedule from '@/components/blocks/widgets/day-schedule/day-schedule';
// import Pipeline from '@/components/blocks/widgets/pipeline/pipeline';
// import { AnyBlockConfig } from '@/components/blocks/widgets/pipeline/pipeline-body';
// import QuickActions from '@/components/blocks/widgets/quick-actions/quick-actions';
// import { useEffect, useRef, useState } from 'react';

// const PipelineBlocks: AnyBlockConfig[] = [
//   {
//     type: 'Income',
//     props: {
//       hours: { prev: 120, value: 145 },
//       income: { prev: 2040, value: 3880 },
//       title: 'Income',
//       mode: 'total',
//     },
//   },
//   {
//     type: 'Expected',
//     props: {
//       prev: 800,
//       value: 1020,
//       title: 'Expected',
//     },
//   },
//   {
//     type: 'Orders',
//     props: {
//       prev: 8,
//       value: 10,
//       title: 'Orders',
//     },
//   },
//   {
//     type: 'Cancelation',
//     props: {
//       prev: 1,
//       value: 2,
//       title: 'Cancelation',
//     },
//   },
//   {
//     type: 'Conversion',
//     props: {
//       leads: 42,
//       bookings: 18,
//       title: 'Conversion',
//     },
//   },
// ];

// export default function Dashboard() {
//   const [height, setHeight] = useState(0);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const header = headerRef.current;
//     if (!container || !header) return;

//     const observer = new ResizeObserver(() => {
//       setHeight(container.clientHeight - header.clientHeight);
//     });

//     observer.observe(container);
//     observer.observe(header);

//     return () => observer.disconnect();
//   }, []);
//   return (
//     <div
//       ref={containerRef}
//       className="custom-scrollbar relative flex min-w-210 flex-1 flex-col items-start gap-2 p-2 will-change-[wight]"
//     >
//       <div ref={headerRef} className="w-full">
//         <Pipeline className="w-full" blocks={PipelineBlocks} />
//       </div>
//       <div
//         style={{
//           height: height ? `${height}px` : '',
//         }}
//         className="grid min-h-152 w-full grid-cols-2 grid-rows-2 gap-2"
//       >
//         <DaySchedule className="row-span-2" />
//         <AITip className="" />
//         <QuickActions className="" />
//       </div>
//     </div>
//   );
// }
