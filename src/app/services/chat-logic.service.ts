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
    return newQuestionNumber;
  }

  submitAnswer(answerText: string): void {
    this.displayBubbles.push({
      learner: true,
      text: answerText,
    });
    if (answerText === 'e') {
      this.runExample();
    } else {
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

  messages: string[] = [
    'Hi John, nice to see you again',
    'Give me a moment and let me take a look at your An Scéalaí stories...',
    'Ok, I see you have written 2 stories since we last met: "{STORY 1 NAME}" and "{STORY 2 NAME}", that\'s good going!',
    'You made some great sentences there',
    'I especially like: {SENTENCE WITH NO ERRORS AND RELATIVELY COMPLEX GRAMMATICAL CONSTRUCT}',
    '{GRAMMATICAL CONSTRUCT} is quite difficult, so well done there!',
    'Also, your vocabulary usage is widening too!',
    'I see you used the {POS} {VOCAB ITEM 1} and {POS} {VOCAB ITEM 2} for the first time',
    "It's an interesting word {VOCAB ITEM 1}",
    'That word is used a lot in {LARA STORY X}, you should check it out',
    'I also see that you made a couple of errors with {IRR VERB Y}',
    'For example, you said {INCORRECT GRAMMAR EXAMPLE 1}, before correcting it.',
    'Then you used {INCORRECT GRAMMAR EXAMPLE 2}',
    "That's a really common error that almost everyone makes",
    'It might help if we practice {VERB/TENSE/FORM}',
    'Shall we start?',
  ];
  runExample(): void {
    let count = 0;
    let i = setInterval(() => {
      this.displayBubbles.push({
        learner: false,
        text: this.messages[count],
      });
      count += 1;
      count >= this.messages.length ? clearInterval(i) : null;
    }, 4000);
  }
}
