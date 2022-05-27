import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerbsComponent } from './components/verbs/verbs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TensesComponent } from './components/tenses/tenses.component';
import { TaskComponent } from './components/task/task.component';
import { PracticeComponent } from './components/practice/practice.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import { MessageComponent } from './components/chat-main/message/message.component';
import { KeyboardComponent } from './components/chat-main/keyboard/keyboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    VerbsComponent,
    DashboardComponent,
    TensesComponent,
    TaskComponent,
    PracticeComponent,
    PageNotFoundComponent,
    ChatMainComponent,
    MessageComponent,
    KeyboardComponent,
    ToolbarComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
