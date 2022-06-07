import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Message } from '../interfaces/message'
import { TaskStateService } from '../services/task-state.service';
import Task from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private postUrl = "http://localhost:5000/api/v1/irrVerbBot/createMessage"
  private updateUrl = "http://localhost:5000/api/v1/irrVerbBot/updateMessage"
  private getUrl = "http://localhost:5000/api/v1/irrVerbBot/getMessages"

  constructor(
    private http:HttpClient,
    private taskStateService: TaskStateService
  ) { }

  messages:Message[];
  mostRecentMessage:Message;

  getMessages(/*task:Task*/) {
    console.log('getting messages')
    let httpParams = new HttpParams()
      //.append("task", JSON.stringify(task))
      .append("chat_id", this.taskStateService.getID("chat"))
    let messages = this.http.get<Message[]>(
      this.getUrl,
      {params: httpParams}
    )
    return messages
  }

  createNewMessage(msg:Message):void {
    let messages = this.http.post<Message>(this.postUrl, {
        msg: msg,
      })
    messages.subscribe((m:Message) => {
      this.messages.push(m) 
      this.mostRecentMessage = m
    })
  }
  
  updateLastMessage(msg:Message):void {
    //console.log('in updateLastMessage:', msg)
    let updatedMsg = this.http.post<Message>(this.updateUrl, {
      msg: msg,
    })
    updatedMsg.subscribe((m:Message) => {
      console.log('m:', m)
    })
  }
}
