import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStateService } from '../../services/task-state.service';
import { GetVerbsService } from '../../services/get-verbs.service';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {
  verbs: string[];

  constructor(
    private router: Router,
    private getVerbsService: GetVerbsService,
    private taskStateService: TaskStateService
  ) {}

  ngOnInit(): void {
    this.verbs = this.getVerbsService.getVerbList();
  }

  chooseVerb(v: string): void {
    this.taskStateService.addVerb(v);

    this.router.navigate(['/tenses']);
  }
}
