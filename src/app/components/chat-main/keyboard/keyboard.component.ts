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
  keyboard: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      layout: keyboardOptions.layout,
      display: keyboardOptions.display,
      buttonTheme: keyboardOptions.button,
      maxLength: 35,
      onChange: input => this.onChange(input),
      onKeyPress: (button: string) => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.value = input;
    this.keyboard.setInput(input);
  };

  onKeyPress = (button: string) => {
    if (button === "{fada}" || button === "{urú}" || button === "{séimhiú}" ) { 
      this.handleShift(button);
    } else if (button === "{enter}") {
      this.addMessage()
    } else {
      setTimeout(()=>{this.handleShift('{úru}')}, 10)
      //this.keyboard.onKeyPress = null
    } 
  }

  addMessage = () => {
    console.log('msg:', this.value)
    const msg = {
      text: this.value,
      user_id: '627e4a9f6fa530de58310a6d',
      chat_id: '627e4e836fa530de58310a81'
    }
    //console.log('newMessage:', msg)
    this.value = "";
    this.keyboard.setInput(""); // need to delete this too to clear everything.
    this.onAddMessage.emit(msg)
  }

  //onInputChange = (event: any) => {
    //console.log('event:', event)
    //this.keyboard.setInput(event.target.value);
  //};

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
