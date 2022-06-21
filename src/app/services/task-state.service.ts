import { Injectable } from '@angular/core';
import Task from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskStateService {
  private task: Task = {
    verb: 'abair',
    tense: 'aimsir láithreach',
    form: 'questions',
    notCompleted: [],
  };

  private userId: string = '627e4a9f6fa530de58310a6e';
  private chatId: string;

  constructor() {}

  getID(idName: string): string {
    if (idName === 'user') {
      return this.userId;
      //} else if (idName === "bot") {
      //return this.botId
    } else if (idName === 'chat') {
      return this.chatId;
    } else {
      return 'none';
    }
  }

  updateChatID(idVal: string): void {
    this.chatId = idVal;
  }

  getTask(): Task {
    return this.task;
  }

  addVerb(verb: string): void {
    this.task.verb = verb;
  }

  addTense(tense: string): void {
    this.task.tense = tense;
  }

  addForm(form: string): void {
    this.task.form = form;
  }

  addNotCompleted(qL: number[]): void {
    this.task.notCompleted = qL;
  }

  removeFromNotCompleted(index: number) {
    this.task.notCompleted.splice(index, 1);
  }
}
