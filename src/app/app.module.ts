import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { FlexSplitterComponent } from './flex-splitter/flex-splitter.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    FlexSplitterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
