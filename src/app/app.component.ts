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
      taskView: false,
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
        this.calendar.createSchedules([
          {
            id: i++ +"",
            calendarId: '1',
            title: element.note,
            category: 'time',
            dueDateClass: '',
            bgColor: "white",
            start: new Date(element.date),
            end: new Date(element.date)
          }
        ]);

      });
    });
  }

  setWeek() {
    this.calendar.changeView('week');
    this.calendar.next();
    this.calendar.prev();
  }

  setMonth() {
    this.calendar.changeView('month');
  }

  next() {
    const currentScroll = document.querySelector(".tui-full-calendar-timegrid-container").scrollTop;

    this.calendar.next();

    setTimeout(() => {
      document.querySelector(".tui-full-calendar-timegrid-container").scrollTop = currentScroll;
    });
  }

  prev() {
    const currentScroll = document.querySelector(".tui-full-calendar-timegrid-container").scrollTop;

    this.calendar.prev();

    setTimeout(() => {
      document.querySelector(".tui-full-calendar-timegrid-container").scrollTop = currentScroll;
    });
  }

  nextDayInWeek() {
    const o = this.calendar.getOptions();
    const currentScroll = document.querySelector(".tui-full-calendar-timegrid-container").scrollTop;
    this.calendar.setOptions({
      ... o,
      week : {
        ... o.week,
        startDayOfWeek: o.week.startDayOfWeek+1,
      }
    });
    this.calendar.next();
    this.calendar.prev();

    setTimeout(() => {
      document.querySelector(".tui-full-calendar-timegrid-container").scrollTop = currentScroll;
    });
  }

  prevDayInWeek() {
    const currentScroll = document.querySelector(".tui-full-calendar-timegrid-container").scrollTop;

    const o = this.calendar.getOptions();
    this.calendar.setOptions({
      ... o,
      week : {
        ... o.week,
        startDayOfWeek: o.week.startDayOfWeek-1,
      }
    });

    setTimeout(() => {
      document.querySelector(".tui-full-calendar-timegrid-container").scrollTop = currentScroll;
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
