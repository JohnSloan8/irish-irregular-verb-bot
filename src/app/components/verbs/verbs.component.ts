import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})
export class VerbsComponent implements OnInit {

  irrVerbs = ['abair', 'beir', 'bí', 'clois', 'déan', 'faigh', 'feic', 'ith', 'tabhair', 'tar', 'téigh']

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  chooseVerb(v: string): void {
    console.log('chooseVerb:', v)
    this.router.navigate(['/tenses'])
  }

}
