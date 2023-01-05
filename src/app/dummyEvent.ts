import { StringifyOptions } from "querystring";
import { DateType, IEventScheduleObject, ISchedule } from "tui-calendar";

export class DummyEvent implements ISchedule {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllDay?: boolean;
  category?: string;
  dueDateClass?: string;
  location?: string;
  attendees?: string[];
  recurrenceRule?: string;
  isPending?: boolean;
  isFocused?: boolean;
  isVisible?: boolean;
  isReadOnly?: boolean;
  isPrivate?: boolean;
  color?: string;
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
  customStyle?: string;
  raw?: {
    [propName: string]: string | number | boolean | object | null;
  }
  state?: string;

  constructor(event : ISchedule) {
    Object.assign(this, event);
  }

}
