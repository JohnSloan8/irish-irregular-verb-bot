import { Component, OnInit } from '@angular/core';
import { TaskStateService } from '../../services/task-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskTypes = ['briathar a roghnú', 'go léir briathar']

  constructor(
    private router: Router,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
  }

  chooseTask(t: string): void {
    if ( t === "briathar a roghnú" ) {
      this.router.navigate(['/verbs'])
    } else {
      this.taskStateService.addVerb('all')
      this.router.navigate(['/tenses'])
    }
  }

}
