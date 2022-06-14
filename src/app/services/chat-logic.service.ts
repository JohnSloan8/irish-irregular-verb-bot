import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { DisplayBubble } from '../interfaces/displayBubble';
import { TaskStateService } from './task-state.service';
import { MessageService } from './message.service';
import { GetVerbsService } from './get-verbs.service';
import Task from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class ChatLogicService {
  constructor(
    private taskStateService: TaskStateService,
    private getVerbsService: GetVerbsService,
    public messageService: MessageService
  ) {}

  //task:Task;
  displayBubbles: DisplayBubble[] = [];
  questionList: [];

  populateDisplayBubbles(messages: Message[]): void {
    this.displayBubbles = []; //reset
    this.questionList = this.getVerbsService.getQuestionList(
      this.taskStateService.getTask()
    );
    this.fillNotCompletedArray();
    this.displayBubbles.push({
      learner: false,
      text: 'dia duit',
    });
    //console.log('messages:', messages)
    if (messages.length === 0) {
      this.createNewMessage(true);
    } else {
      messages.forEach((m, i) => {
        this.displayBubbles.push({
          learner: false,
          text: this.questionList[m.question_no]['question'],
        });
        if (m.text !== undefined) {
          this.displayBubbles.push({
            learner: true,
            text: m.text,
          });
        }
        if (m.correct !== undefined) {
          let botMessage = 'go hiontach';
          if (!m.correct) {
            botMessage = 'mícheart';
          }
          this.displayBubbles.push({
            learner: false,
            text: m.feedback ? m.feedback : 'mícheart',
          });
          if (i === messages.length - 1) {
            this.createNewMessage(m.correct);
          }
        }
      });
    }
  }

  fillNotCompletedArray(): void {
    let tempNotCompleted = [...Array(this.questionList.length).keys()];
    this.messageService.messages.forEach((m) => {
      tempNotCompleted = tempNotCompleted.filter((n) => {
        return n !== m.question_no;
      });
    });
    this.taskStateService.addNotCompleted(tempNotCompleted);
  }

  createNewMessage(lastCorrect: boolean): void {
    let questionNumber;
    if (this.messageService.mostRecentMessage === undefined) {
      // first question
      questionNumber = this.generateNewQuestionNumber();
    } else if (this.taskStateService.getTask().notCompleted.length !== 0) {
      if (!lastCorrect) {
        questionNumber = this.messageService.mostRecentMessage.question_no;
      } else {
        questionNumber = this.generateNewQuestionNumber();
      }
    } else {
      questionNumber = -1;
    }
    let newMsg: Message = {
      user_id: this.taskStateService.getID('user'),
      chat_id: this.taskStateService.getID('chat'),
      verb: this.taskStateService.getTask().verb,
      tense: this.taskStateService.getTask().tense,
      form: this.taskStateService.getTask().form,
      question_no: questionNumber,
    };

    let message = 'completed';
    console.log('questionNumber:', questionNumber);
    if (questionNumber !== -1) {
      message = this.questionList[questionNumber]['question'];
      this.messageService.createNewMessage(newMsg);
    }
    this.displayBubbles.push({
      learner: false,
      text: message,
    });
  }

  generateNewQuestionNumber(): number {
    let randomNumber = Math.floor(
      Math.random() * this.taskStateService.getTask().notCompleted.length
    );
    let newQuestionNumber =
      this.taskStateService.getTask().notCompleted[randomNumber];
    this.taskStateService.removeFromNotCompleted(randomNumber);
    console.log('randomNumber:', newQuestionNumber);
    console.log('notCompleted:', this.taskStateService.getTask());
    return newQuestionNumber;
  }

  submitAnswer(answerText: string): void {
    this.displayBubbles.push({
      learner: true,
      text: answerText,
    });
    this.messageService.mostRecentMessage.text = answerText;
    let correctAnswer =
      this.questionList[this.messageService.mostRecentMessage.question_no][
        'answer'
      ];
    if (answerText === correctAnswer) {
      this.messageService.mostRecentMessage.correct = true;
      this.messageService.mostRecentMessage.feedback = 'go hiontach';
      setTimeout(() => {
        this.createNewMessage(true);
      }, 2000);
    } else {
      this.messageService.mostRecentMessage.correct = false;
      this.getVerbsService.generateIncorrectFeedback(
        this.messageService.mostRecentMessage
      );
    }
    this.messageService.updateLastMessage(
      this.messageService.mostRecentMessage
    );
    setTimeout(() => {
      this.displayBubbles.push({
        learner: false,
        text: this.messageService.mostRecentMessage.feedback
          ? this.messageService.mostRecentMessage.feedback
          : "heven't the foggiest",
      });
      if (!this.messageService.mostRecentMessage.correct) {
        setTimeout(() => {
          this.displayBubbles.push({
            learner: false,
            text: 'try again',
          });
          setTimeout(() => {
            this.createNewMessage(false);
          }, 1500);
        }, 2000);
      }
    }, 1000);
  }
}
