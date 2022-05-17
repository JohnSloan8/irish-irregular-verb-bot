import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startPractice(): void {
    console.log('start practice');
    this.router.navigate(['/task'])
  }


}
