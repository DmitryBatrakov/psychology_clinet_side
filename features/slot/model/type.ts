import { Timestamp } from "firebase/firestore";

export interface TimeInterval {
  startTime: string; 
  endTime: string;   
}

export type WeekdayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type WeekdayIntervals = Record<WeekdayKey, TimeInterval[]>;

export interface ScheduleRule {
  id: string;                 
  specialistId: string;
  type: "weekly";
  timeZone: string;           // "Asia/Jerusalem"
  weekdayIntervals: WeekdayIntervals;
  isActive: boolean;

  displayHorizonMonths?: 1 | 2 | 3; 

  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export type ScheduleOverrideType = "block" | "custom" | "add";

export interface ScheduleOverride {
  id: string;                 
  specialistId: string;
  date: string;              
  type: ScheduleOverrideType;
  reason?: string;

  // block
  blockAllDay?: boolean;      // true => fully closed
  blockStartTime?: string;    // partial block
  blockEndTime?: string;

  // custom => full replacement
  customIntervals?: TimeInterval[];

  // add => append to weekly intervals
  addIntervals?: TimeInterval[];

  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}
