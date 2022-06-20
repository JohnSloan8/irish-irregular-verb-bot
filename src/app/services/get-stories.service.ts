import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Story } from '../interfaces/story';

@Injectable({
  providedIn: 'root',
})
export class GetStoriesService {
  private getUrl = 'http://localhost:5000/api/v1/irrVerbBot/getStories';

  constructor(private http: HttpClient) {}

  stories: Story[];
  mostRecentStory: Story;

  getStories(/*task:Task*/) {
    let httpParams = new HttpParams()
      //.append("task", JSON.stringify(task))
      // .append('chat_id', this.taskStateService.getID('chat'));
      .append('username', 'johnny');
    let stories = this.http.get<Story[]>(this.getUrl, { params: httpParams });
    return stories;
  }
}
