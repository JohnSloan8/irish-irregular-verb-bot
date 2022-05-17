import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  taskTypes = ['briathar a roghnú', 'go léir briathar', 'randamach']

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  chooseTask(t: string): void {
    console.log('chooseTask:', t)
    if ( t === "briathar a roghnú" ) {
      this.router.navigate(['/verbs'])
    } else {
      this.router.navigate(['/tenses'])
    }
  }

}
