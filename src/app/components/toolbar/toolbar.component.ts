import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title = 'Briathar Neamhrialta Chatbot';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateHome(): void {
    console.log('going home')
    this.router.navigate([''])
  }


}
