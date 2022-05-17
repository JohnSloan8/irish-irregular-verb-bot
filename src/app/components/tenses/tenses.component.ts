import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss']
})
export class TensesComponent implements OnInit {

  tenses = ["aimsir chaite", "aimsir láithreach", "aimsir fháistineach", "modh coinníollach", "randamach"]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  chooseTense(a: string): void {
    console.log('chooseTense:', a)
    this.router.navigate(['/chat'])
  }

}
