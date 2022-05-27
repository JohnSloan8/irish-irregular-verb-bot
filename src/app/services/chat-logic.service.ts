import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message'
import { DisplayBubble } from '../interfaces/displayBubble'
import { TaskStateService } from './task-state.service';
import { MessageService } from './message.service';
import { getQuestionList } from '../../scripts/main';
import Task from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})

export class ChatLogicService {

  constructor(
    private taskStateService: TaskStateService,
    public messageService:MessageService
  ) { }

  task:Task;
  displayBubbles:DisplayBubble[] = [];
  questionList:[];
  
  populateDisplayBubbles(messages:Message[]):void {
    this.task = this.taskStateService.getTask()
    this.questionList = getQuestionList(this.task)
    console.log('this.questionList', this.questionList)
    this.displayBubbles.push({
      learner: false,
      text: this.task.verb + ", " + this.task.tense + ", " + this.task.form
    })
    console.log('messages:', messages)
    messages.forEach((m, i) => {
      console.log('m', m)
      this.displayBubbles.push({
        learner: false,
        text: this.questionList[m.question_no]["question"]
      })
      if (m.text !== undefined) {
        this.displayBubbles.push({
          learner: true,
          text: m.text
        })
      }
      if (m.correct !== undefined) {
        let botMessage = "go hiontach"
        if (!m.correct) {
          botMessage = "mícheart"
        }
        this.displayBubbles.push({
          learner: false,
          text: botMessage
        })
        if ( i === messages.length-1 ) {
          this.createNewMessage(m.correct)
        }      
      }
    })
  }

  createNewMessage(lastCorrect:boolean):void {
    let questionNumber = this.messageService.mostRecentMessage.question_no
    if (lastCorrect) {
      questionNumber = Math.floor(Math.random() * 10);
    }
    let newMsg:Message = {
      user_id: this.taskStateService.getID("user"),
      chat_id: this.taskStateService.getID("chat"),
      verb: this.task.verb,
      tense: this.task.tense,
      form: this.task.form,
      question_no: questionNumber
    }
    this.messageService.createNewMessage(newMsg)
    this.displayBubbles.push({
      learner: false,
      text: this.questionList[questionNumber]["question"]
    })
  }

  submitAnswer(answerText:string):void {
    this.displayBubbles.push({
      learner: true,
      text: answerText
    })
    let botResponse = "go hiontach"
    this.messageService.mostRecentMessage.text = answerText
    let correctAnswer = this.questionList[this.messageService.mostRecentMessage.question_no]['answer']
    console.log('correctAnswer', correctAnswer)
    if ( answerText === correctAnswer ) {
      this.messageService.mostRecentMessage.correct = true
      setTimeout(()=> {
        this.createNewMessage(true)
      }, 1000)
    } else {
      this.messageService.mostRecentMessage.correct = false
      botResponse = "mícheart"
    }
    this.messageService.updateLastMessage(this.messageService.mostRecentMessage)
    setTimeout(() => {
      this.displayBubbles.push({
        learner: false,
        text: botResponse
      })
      if (!this.messageService.mostRecentMessage.correct) {
        setTimeout(() => {
            this.createNewMessage(false)
        }, 500)
      }
    }, 500)

  }

}
