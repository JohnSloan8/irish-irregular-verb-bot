import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import Keyboard from "simple-keyboard";
import { keyboardOptions } from './keyboard.options'
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../interfaces/message'

@Component({
  selector: 'app-keyboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  providers: [MessageService]
})
export class KeyboardComponent implements OnInit {

  @Output() onAddMessage: EventEmitter<Message> = new EventEmitter()

  msg:Message;

  constructor(private messageService:MessageService){}

  value = "";
  shifted: boolean = false;
  keyboard: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      layout: keyboardOptions.layout,
      display: keyboardOptions.display,
      buttonTheme: keyboardOptions.button,
      maxLength: 35,
      onChange: input => this.onChange(input.toLowerCase()),
      onKeyPress: (button: string) => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    if (!this.shifted) {
      this.value = input;
      console.log("Input changed", input);
    }
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);
    if (button === "{fada}" || button === "{urú}" || button === "{séimhiú}" ) { 
      this.handleShift(button);
    } else if (button === "{enter}") {
      console.log('clicked cuir')
      this.addMessage()
    }
  }

  addMessage = () => {
    console.log('msg:', this.value)
    const msg = {
      text: this.value,
      user_id: '1',
      chat_id: '1'
    }
    console.log('newMessage:', msg)
    this.onAddMessage.emit(msg)
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = (button: string) => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = "default";
    if (button === "{urú}") {
      if (currentLayout !== "urú") shiftToggle = "urú";
    } else if (button === "{séimhiú}") {
      if (currentLayout !== "séimhiú") shiftToggle = "séimhiú";
    } else if (button === "{fada}") {
      if (currentLayout !== "fada") shiftToggle = "fada";
    } 

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });

  };


  ngOnInit(): void {
  }

}
