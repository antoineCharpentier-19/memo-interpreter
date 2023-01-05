import { AfterViewInit, Component, OnInit } from '@angular/core';
import Calendar from 'tui-calendar';
import { DummyEvent } from './dummyEvent';
import { MemoService } from './memo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {


  constructor(
    private memoService: MemoService,
  ) {}

  calendar: Calendar;

  ngAfterViewInit(): void {
    globalThis.hourHeight = 50;

    this.calendar = new Calendar('#calendar', {
      defaultView: 'week',
      theme: {
        'week.timegridOneHour.height': `${globalThis.hourHeight}px`,
        'week.timegridHalfHour.height': `${globalThis.hourHeight/2 - 1}px`,
        'week.timegridHalfHour.borderBottom': '1px dashed #e5e5e5',
      }
    });

    this.memoService.getMemos().subscribe((data) => {
      let i = 0;
      (data as Array<any>).forEach(element => {
        // element structure is {date, note}
        const event =
        // {
        //   id: i++ +"",
        //   calendarId: '1',
        //   title: element.note,
        //   category: 'time',
        //   dueDateClass: '',
        //   bgColor: "blue",
        //   start: element.date,
        //   end: element.date
        // }
        {
          id: i++ +"",
          calendarId: '1',
          title: 'second schedule',
          category: 'time',
          dueDateClass: '',
          bgColor: "red",
          start: '2023-01-02:33:00+09:00',
          end: '2023-01-03:33:00+09:00'
        }
        // this.calendar.createSchedules([
        //   event
        // ])

      });

      this.calendar.createSchedules([
        {
          id: "hohoho",
          calendarId: '1',
          title: 'second schedule',
          category: 'time',
          dueDateClass: '',
          bgColor: "red",
          start: '2023-01-02:33:00+09:00',
          end: '2023-01-03:33:00+09:00'
        }
      ])

    });
  }

  setWeek() {
    this.calendar.changeView('week');
  }

  setMonth() {
    this.calendar.changeView('month');
  }

  next() {
    this.calendar.next();
  }

  prev() {
    this.calendar.prev();
  }

  nextDayInWeek() {
    const o = this.calendar.getOptions();
    this.calendar.setOptions({
      ... o,
      week : {
        ... o.week,
        startDayOfWeek: o.week.startDayOfWeek+1,
      }
    });
  }

  prevDayInWeek() {
    const o = this.calendar.getOptions();
    this.calendar.setOptions({
      ... o,
      week : {
        ... o.week,
        startDayOfWeek: o.week.startDayOfWeek-1,
      }
    });
  }

  zoomIn() {
    globalThis.hourHeight *= 1.3;
    document.querySelector(".tui-full-calendar-timegrid-container").scrollTop *= 1.3;
    this.calendar.setTheme({
      'week.timegridOneHour.height': `${globalThis.hourHeight}px`,
      'week.timegridHalfHour.height': `${globalThis.hourHeight/2 - 1}px`,
      'week.timegridHalfHour.borderBottom': '1px dashed #e5e5e5',
    });
  }

  zoomOut() {
    globalThis.hourHeight /= 1.3;
    document.querySelector(".tui-full-calendar-timegrid-container").scrollTop /= 1.3;
    this.calendar.setTheme({
      'week.timegridOneHour.height': `${globalThis.hourHeight}px`,
      'week.timegridHalfHour.height': `${globalThis.hourHeight/2 - 1}px`,
      'week.timegridHalfHour.borderBottom': '1px dashed #e5e5e5',
    });
  }


}
