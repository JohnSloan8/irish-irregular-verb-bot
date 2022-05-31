import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { TaskStateService } from '../services/task-state.service';
import Task from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private postUrl = "http://localhost:5000/api/v1/irrVerbBot/createChat"
  constructor(
    private http:HttpClient,
    private taskStateService: TaskStateService
  ) { }
  
  createChat() {
    return this.http.post<String>(this.postUrl, {
      user_id: this.taskStateService.getID("user")
    })
  }
  
}
