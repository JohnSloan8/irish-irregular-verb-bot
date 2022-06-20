import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../interfaces/message';
import { DisplayBubble } from '../../interfaces/displayBubble';
import { TaskStateService } from '../../services/task-state.service';
import { ChatLogicService } from '../../services/chat-logic.service';
import { ChatService } from '../../services/chat.service';
import { GetStoriesService } from '../../services/get-stories.service';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.scss'],
})
export class ChatMainComponent implements OnInit {
  messages: Message[] = [];
  displayBubbles: DisplayBubble[] = [];

  constructor(
    private messageService: MessageService,
    private taskStateService: TaskStateService,
    private chatService: ChatService,
    private getStoriesService: GetStoriesService,
    public chatLogicService: ChatLogicService
  ) {}

  ngOnInit(): void {
    this.scrollToBottom();
    let chatID = this.taskStateService.getID('chat');
    console.log('chatID:', chatID);
    if (chatID !== undefined) {
      this.retrieveAllMessages();
    } else {
      this.chatService.createChat().subscribe((c: any) => {
        this.taskStateService.updateChatID(c);
        this.retrieveAllMessages();
      });
      this.getStoriesService.getStories().subscribe((s: any) => {
        console.log('s:', s);
      });
    }
  }

  retrieveAllMessages(): void {
    this.messageService.getMessages().subscribe((m: Message[]) => {
      console.log('m', m);
      this.messageService.messages = m;
      if (m.length > 0) {
        this.messageService.mostRecentMessage = m[m.length - 1];
      }
      this.chatLogicService.populateDisplayBubbles(m);
    });
  }

  addAnswer(answer: string): void {
    this.chatLogicService.submitAnswer(answer);
  }

  // SCROLL TO BOTTOM AUTOMATICALLY
  @ViewChild('chatWindow') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
    //this.messageService.addMessage
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
