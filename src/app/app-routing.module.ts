import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbsComponent } from './components/verbs/verbs.component';
import { TensesComponent } from './components/tenses/tenses.component';
import { TaskComponent } from './components/task/task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'task', component: TaskComponent },
  { path: 'verbs', component: VerbsComponent },
  { path: 'tenses', component: TensesComponent },
  { path: 'chat', component: ChatMainComponent },
  { path: 'form', component: FormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
