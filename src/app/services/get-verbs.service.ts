import { Injectable } from '@angular/core';
import { getVerbScripts } from '../../scripts/questions';
import { MessageService } from './message.service';
import { TaskStateService } from './task-state.service';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class GetVerbsService {
  constructor(
    private taskStateService: TaskStateService,
    private messageService: MessageService
  ) {}

  getQuestionList(task: any) {
    let setOfPossibleQuestions =
      getVerbScripts()[task.verb][task.tense][task.form];
    return setOfPossibleQuestions;
  }

  getVerbList(): string[] {
    let verbs = Object.keys(getVerbScripts());
    return verbs;
  }

  getTenseList(verb: string): string[] {
    let tenses = Object.keys(getVerbScripts()[verb]);
    return tenses;
  }

  getFormList(verb: string, tense: string): string[] {
    let forms = Object.keys(getVerbScripts()[verb][tense]);
    return forms;
  }

  generateIncorrectFeedback = (m: Message): boolean => {
    console.log('m:', m);
    this.wrongSection(m);
    console.log('feedback:', m.feedback);
    return true;
  };

  wrongSection = (m: Message): void => {
    let isIt: boolean = false;
    if (this.checkConj(m, m.verb, m.tense, m.form)) {
      m.feedback =
        "good tense, and good form, but that's not the right conjugation'!";
    } else {
      let formOutput = this.checkForm(m, m.verb, m.tense);
      if (formOutput[0]) {
        m.feedback = `hmmm, nearly, but that's the wrong form. You used '${formOutput[1]}' when you should have used '${formOutput[2]}'`;
      } else {
        let tenseOutput = this.checkTense(m, m.verb);
        if (tenseOutput[0]) {
          m.feedback = `ah Jesus, that's the wrong tense. You used '${tenseOutput[1]}' when you should have used '${tenseOutput[2]}'`;
        } else {
          let verbOutput = this.checkVerb(m);
          if (verbOutput[0])
            m.feedback = `ah now come on, that's the wrong verb entirely. You used '${verbOutput[1]}' when you should have used '${verbOutput[2]}'`;
        }
      }
    }
  };

  checkConj = (
    m: Message,
    verb: string,
    tense: string,
    form: string
  ): boolean => {
    for (let q of getVerbScripts()[verb][tense][form]) {
      console.log('ext, ans', m.text, q.answer);
      if (m.text === q.answer.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  checkForm = (m: Message, verb: string, tense: string): any[] => {
    for (let f of Object.keys(getVerbScripts()[verb][tense])) {
      if (f !== 'extra questions') {
        if (this.checkConj(m, verb, tense, f)) {
          return [true, f, m.form];
        }
      }
    }
    return [false];
  };

  checkTense = (m: Message, verb: string): any[] => {
    for (let t of Object.keys(getVerbScripts()[verb])) {
      if (t !== 'quiz') {
        if (this.checkForm(m, verb, t)[0]) {
          return [true, t, m.tense];
        }
      }
    }
    return [false];
  };

  checkVerb = (m: Message): any[] => {
    for (let v of Object.keys(getVerbScripts())) {
      if (v !== m.verb) {
        if (this.checkTense(m, v)[0]) {
          return [true, v, m.verb];
        }
      }
    }
    return [false];
  };
}
