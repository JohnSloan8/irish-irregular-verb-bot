import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import Keyboard from "simple-keyboard";
import { keyboardOptions } from './keyboard.options'
import { MessageService } from '../../../services/message.service';
import { TaskStateService } from '../../../services/task-state.service';
import { Message } from '../../../interfaces/message'
import Task from "../../../interfaces/task";

@Component({
  selector: 'app-keyboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  providers: [MessageService]
})
export class KeyboardComponent implements OnInit {

  @Output() onAddMessage: EventEmitter<string> = new EventEmitter()

  constructor(
    private messageService:MessageService,
    private taskStateService: TaskStateService
  ){}

  value = "";
  keyboard: Keyboard;
  msg:Message;
  taskHint:string = "nothing yet"
  task:Task;

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

  generateQuestionNumber = () => {
    return Math.floor(Math.random()*10)
  }

  addMessage = () => {
    //console.log('msg:', this.value)
    //const msg = {
      //text: this.value,
      //user_id: this.taskStateService.getID("user"),
      //chat_id: this.taskStateService.getID("chat"),
      //verb: this.task.verb,
      //tense: this.task.tense,
      //form: this.task.form,
      //question_no: this.generateQuestionNumber()
    //}
    ////console.log('newMessage:', msg)
    this.onAddMessage.emit(this.value)
    this.value = "";
    this.keyboard.setInput(""); // need to delete this too to clear everything.
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
    this.task = this.taskStateService.getTask();
    this.taskHint = this.task.verb + ", " + this.task.tense + ", " + this.task.form;
  }

}
