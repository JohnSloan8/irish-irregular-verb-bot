import { Component, OnInit } from '@angular/core';
import { TaskStateService } from '../../services/task-state.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { getFormList } from '../../../scripts/main';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  forms:string[]

  constructor(
    private router: Router,
    private taskStateService: TaskStateService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    let task = this.taskStateService.getTask()
    this.forms = getFormList(task.verb, task.tense)
  }

  chooseForm(f: string): void {
    this.taskStateService.addForm(f)
    this.chatService.createChat().subscribe((c:any) => {
      console.log('c', c) 
      this.taskStateService.updateChatID(c)
      this.router.navigate(['/chat'])
    })
  }

}
