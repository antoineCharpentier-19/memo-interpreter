import { preserveWhitespacesDefault } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Calendar from 'tui-calendar';
import { MemoService } from '../memo.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less']
})
export class ScheduleComponent implements AfterViewInit {

  constructor(
    private memoService: MemoService,
  ) {
      // 10 random letters
      for(let i = 0; i < 10; i++) {
        this.id += String.fromCharCode(97 + Math.floor(Math.random() * 26));
      }
  }

  id;

  calendar: Calendar;
  highlightResults = false;

  ngAfterViewInit(): void {
    globalThis.hourHeight = 100;

    this.calendar = new Calendar('#' + this.id, {
      defaultView: 'week',
      taskView: false,
      month: {
        startDayOfWeek: 1,
        scheduleFilter: (schedule) => {
          // only show events that are in the current month
           return (schedule.start as Date).getMonth() == this.calendar.getDate().toDate().getMonth();
         }
      },
      template: {
        timegridDisplayPrimayTime: time => time.hour+"",
        monthDayname: dayname => dayname.label,
        time: time => {
          if(this.calendar.getViewName() == "month") {
            // format as hh-mm
            const hourMinute = new Date(time.start.valueOf() as any).toLocaleTimeString().substr(0,5);
            return hourMinute + " : " + time.title;
          } else {
            return time.title;
          }
        },
        weekDayname: dayname => dayname.dayName.substr(0,2) +" "+dayname.renderDate.substr(8,2) + "/" + dayname.renderDate.substr(5,2),
      }
    });
    this.setTheme();
    this.getMemos("");
    this.calendar.scrollToNow();

    this.memoService.search$.subscribe((search) => {
      this.getMemos(search);
    });
  }

  getMemos(search) {
    this.calendar.clear();
    this.memoService.getMemos().subscribe((data) => {
      let i = 0;
      let searchterms = search.split("|");
      (data as Array<any>).forEach(element => {
        const match = this.matches(element, searchterms);
        if(match){
          this.addEvent(element, match, i);
        }
        i++;
      });
    });
  }

  private matches(element: any, searchterms: string[]) {
    return searchterms.length === 0 || searchterms.some((term) => element.note.includes(term));
  }

  private addEvent(element: any, matchesQuery: boolean, i: number) {
    if (!matchesQuery && !this.highlightResults) return;

    // element structure is {date, note}
    this.calendar.createSchedules([
      {
        id: i + "",
        calendarId: '1',
        title: element.note,
        category: 'time',
        dueDateClass: '',
        color: "#fff",
        // a  cool navy blue
        bgColor: (matchesQuery && this.highlightResults) ? "red"  : "#354987",
        start: new Date(element.date),
        end: new Date(element.date)
      }
    ]);
  }

  setDay() {
    this.calendar.changeView('day');
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
    this.restoreScroll(() => this.calendar.next());
    this.calendar.getOptions().month.scheduleFilter = (schedule) => {
       // only show events that are in the current month
        return (schedule.start as Date).getMonth() == this.calendar.getDate().toDate().getMonth();
    }
  }

  prev() {
    this.restoreScroll(() => this.calendar.prev());
  }

  nextDayInWeek() {
    this.restoreScroll(()=> {
      const o = this.calendar.getOptions();
      this.calendar.setOptions({
        ... o,
        week : {
          ... o.week,
          startDayOfWeek: o.week.startDayOfWeek+1,
        }
      });
    })
  };

  prevDayInWeek() {
    this.restoreScroll(() =>{
      const o = this.calendar.getOptions();
      this.calendar.setOptions({
        ... o,
        week : {
          ... o.week,
          startDayOfWeek: o.week.startDayOfWeek-1,
        }
      });
    })
  };

  zoomIn() {
    globalThis.hourHeight *= 1.3;
    const timegrid = this.getGrid()
    timegrid.scrollTop = timegrid.scrollTop * 1.3 + timegrid.clientHeight * 0.15;
    this.setTheme();
  }

  zoomOut() {
    const timegrid = this.getGrid()
    timegrid.scrollTop = timegrid.scrollTop / 1.3 - timegrid.clientHeight * 0.15;
    globalThis.hourHeight = Math.max(globalThis.hourHeight / 1.3, timegrid.clientHeight / 24);
    this.setTheme();
  }

  private restoreScroll(callBack :() => void)  {
    if(!this.calendar || this.calendar.getViewName() != "week")
      callBack();
    else {
      const currentScroll = this.getGrid().scrollTop;
      callBack();
      setTimeout(() =>{
          this.getGrid().scrollTop = currentScroll
      });
    }
  }

  private getGrid() {
    return document.querySelector("#" + this.id + " .tui-full-calendar-timegrid-container");
  }

  private setTheme() {
    this.calendar.setTheme({
      'week.timegridOneHour.height': `${globalThis.hourHeight}px`,
      'week.timegridHalfHour.height': `${globalThis.hourHeight / 2 - 1}px`,
      'week.timegridHalfHour.borderBottom': '2px dotted #b3cff9',
    });
  }
}
