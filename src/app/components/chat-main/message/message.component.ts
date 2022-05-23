import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../interfaces/message'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  
  messageClass:string = "talk-bubble-left tri-right left-top"
  
  @Input() message: any;

  constructor() { 
  }

  ngOnInit(): void {
    if (this.message.user_id !== "627e4a7d6fa530de58310a6d") {
      this.messageClass = "talk-bubble tri-right right-top"
    }
  }

}
