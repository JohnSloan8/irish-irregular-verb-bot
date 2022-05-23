import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title = 'An Bat Mírialta';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome(): void {
    this.router.navigate([''])
  }


}
