'use client';
import { Contact } from 'lucide-react';
import Widget, { WidgetProps } from '../widget';
import DayScheduleBody from './day-schedule-body';

function DaySchedule({ ...rest }: WidgetProps) {
  return (
    <Widget {...rest}>
      <Widget.Header>
        <Widget.Title>
          <Contact size={18} /> Day Schedule - Your day meetings
        </Widget.Title>
      </Widget.Header>
      <Widget.Content className="overflow-hidden rounded-sm py-0 pr-0 pl-3 shadow-[inset_0_0_5px_1px] shadow-black/10">
        <DayScheduleBody />
      </Widget.Content>
    </Widget>
  );
}

export default DaySchedule;
