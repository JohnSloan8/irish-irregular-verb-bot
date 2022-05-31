import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStateService } from '../../services/task-state.service';
import { getTenseList } from '../../../scripts/main';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss']
})
export class TensesComponent implements OnInit {

  tenses: string[] 

  constructor(
    private router: Router,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
    this.tenses = getTenseList(this.taskStateService.getTask().verb) 
  }

  chooseTense(a: string): void {
    this.taskStateService.addTense(a)
    this.router.navigate(['/form'])
  }

}
