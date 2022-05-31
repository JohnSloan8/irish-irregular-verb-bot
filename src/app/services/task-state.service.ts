import { Injectable } from '@angular/core';
import Task from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {

  private task:Task = {
    verb: 'abair',
    tense: 'aimsir láithreach',
    form: 'questions',
    notCompleted: []
  };

  private userId:string = '627e4a9f6fa530de58310a6e'
  private botId:string = '627e4a7d6fa530de58310a6d'
  private chatId:string = '627e4e836fa530de58310a81'

  constructor() { }

  getID(idName:string):string {
    if (idName === "user") {
      return this.userId
    } else if (idName === "bot") {
      return this.botId
    } else if (idName === "chat") {
      return this.chatId
    } else {
      return "none"
    }
  }

  updateChatID(idVal:string):void {
    this.chatId = idVal
  }

  getTask():Task {
    return this.task
  }

  addVerb(verb:string):void {
    this.task.verb = verb
    console.log('adding verb:', verb)
  }

  addTense(tense:string):void {
    this.task.tense = tense
    console.log('adding tense:', tense)
  }

  addForm(form:string):void {
    this.task.form = form
    console.log('adding form:', form)
  }

  removeFromNotCompleted(index:number) {
    this.task.notCompleted.splice(index, 1)
    console.log('notCompleted:' , this.task.notCompleted)
  }

}
