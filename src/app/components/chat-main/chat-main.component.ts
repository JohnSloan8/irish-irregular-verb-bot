import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message'

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss']
})
export class ChatMainComponent implements OnInit {

  messages:Message[] = []

  constructor(public messageService:MessageService){}

  ngOnInit(): void {
    this.scrollToBottom();
    this.retrieveAllMessages();
  }
  
  retrieveAllMessages():void {
    this.messageService.getMessages().subscribe((m:any) => {
      this.messages = m
    });
  }

  addMsg(msg:Message):void {
    //console.log('msg in ChatMain:', msg)
    this.messages.push(msg)
    this.messageService.postMessage(msg).subscribe((m:any) => {
      this.messages.push(m)
      console.log('m:', m)
    });
  }

  // SCROLL TO BOTTOM AUTOMATICALLY
  @ViewChild('chatWindow') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom()
    //this.messageService.addMessage
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
