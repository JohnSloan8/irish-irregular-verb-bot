import { Component, OnInit, Input } from '@angular/core';
import { DisplayBubble } from '../../../interfaces/displayBubble';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  displayBubbleClass: string = 'talk-bubble-left tri-right left-top';
  textForThisMessage: string = 'test message';
  backgroundColor: string = '#55bb11';

  @Input() displayBubble: DisplayBubble;

  constructor() {}

  ngOnInit(): void {
    if (this.displayBubble.learner) {
      this.displayBubbleClass = 'talk-bubble tri-right right-top';
    }
    this.textForThisMessage = this.displayBubble.text;
  }
}
