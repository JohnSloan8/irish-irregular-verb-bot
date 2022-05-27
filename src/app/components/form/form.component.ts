import { Component, OnInit } from '@angular/core';
import { TaskStateService } from '../../services/task-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formTypes = ['questions', 'ní', 'briathar saor', 'ceisteach', 'spleach', 'extra questions', 'go léir']

  constructor(
    private router: Router,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
  }

  chooseForm(f: string): void {
    this.taskStateService.addForm(f)
    console.log('this.task:', this.taskStateService.getTask())
    this.router.navigate(['/chat'])
  }

}
