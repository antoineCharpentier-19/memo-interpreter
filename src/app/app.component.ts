import { preserveWhitespacesDefault } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Calendar from 'tui-calendar';
import { DummyEvent } from './dummyEvent';
import { MemoService } from './memo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  nbPanels = 1;

  arrayOf=(n:number)=>Array(n).fill(0).map((_,i)=>i);

  constructor(
    public memoService: MemoService
  ) {}

 }
