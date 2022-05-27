import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStateService } from '../../services/task-state.service';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss']
})
export class TensesComponent implements OnInit {

  tenses = ["aimsir chaite", "aimsir láithreach", "aimsir fháistineach", "modh coinníollach", "go léir aimsir"]

  constructor(
    private router: Router,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
  }

  chooseTense(a: string): void {
    this.taskStateService.addTense(a)
    this.router.navigate(['/form'])
  }

}
