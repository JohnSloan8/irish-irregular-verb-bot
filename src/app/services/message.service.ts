import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from '../interfaces/message'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private postUrl = "http://localhost:5000/api/v1/irrVerbBot/createMessage"
  private getUrl = "http://localhost:5000/api/v1/irrVerbBot/getMessages"

  constructor(private http:HttpClient) { }

  getMessages() {
    return this.http.get<Message[]>(this.getUrl)
  }

  postMessage(msg:any) {
    return this.http.post<Message>(this.postUrl, msg)
  }
  
}
