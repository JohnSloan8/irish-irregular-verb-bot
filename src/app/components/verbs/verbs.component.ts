import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStateService } from '../../services/task-state.service';
import { getVerbList } from '../../../scripts/main';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})
export class VerbsComponent implements OnInit {

  verbs: string[]

  constructor(
    private router: Router,
    private taskStateService: TaskStateService
  ) { }

  ngOnInit(): void {
    this.verbs = getVerbList() 
  }

  chooseVerb(v: string): void {
    this.taskStateService.addVerb(v)

    this.router.navigate(['/tenses'])
  }

}
