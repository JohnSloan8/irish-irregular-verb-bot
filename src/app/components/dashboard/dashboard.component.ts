import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartPlaceholder = "/assets/irr-verb-chart.png"

  constructor() { }

  ngOnInit(): void {
  }

}
