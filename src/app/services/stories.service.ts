import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Story } from '../interfaces/story';
import { generateVerbObject } from '../../scripts/questions';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private getUrl = 'http://localhost:5000/api/v1/irrVerbBot/getStories';

  constructor(private http: HttpClient) {}

  stories: Story[];
  verbObject: any;
  allVerbs: string[];
  tokenisedString: string[];

  getStories(/*task:Task*/) {
    let httpParams = new HttpParams()
      //.append("task", JSON.stringify(task))
      // .append('chat_id', this.taskStateService.getID('chat'));
      .append('username', 'johnny');
    this.http
      .get<Story[]>(this.getUrl, { params: httpParams })
      .subscribe((s: any) => {
        this.stories = s;
        console.log('this.stories:', this.stories);
        this.analyseStories();
      });
  }

  analyseStories() {
    let verbData = generateVerbObject();
    this.allVerbs = verbData[0];
    this.verbObject = verbData[1];
    // console.log('verbObject', this.verbObject);
    // console.log('allVerbs', this.allVerbs);
    this.stories.forEach((s) => {
      this.tokenisedString = s.text
        .split(/[^\w'ÁÉÍÓÚáéíóú]+/)
        .filter((w) => w !== '');
      console.log('tokenisedString:', this.tokenisedString);
      this.tokenisedString.forEach((word: string) => {
        if (this.allVerbs.includes(word)) {
          console.log('hit:', word);
          this.getVerbInfo(word);
        }
      });
    });
  }

  getVerbInfo(v: string) {
    Object.keys(this.verbObject).forEach((verb) => {
      Object.keys(this.verbObject[verb]).forEach((tense) => {
        Object.keys(this.verbObject[verb][tense]).forEach((form) => {
          this.verbObject[verb][tense][form].forEach((verbType: string) => {
            if (verbType === v) {
              console.log(v, verb, tense, form);
            }
          });
        });
      });
    });
  }
}
