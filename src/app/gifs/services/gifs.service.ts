import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private apikey: string = 'EnFWRTLnnkSQkrqa1iJJTwUhMSxFrY9b';
  private serviUrl: string = "https://api.giphy.com/v1/gifs";
  private _tagsHistory: string[] = [];
  public gifList:Gif[] = [];

  constructor(private http: HttpClient) { }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
    }
    this._tagsHistory = this._tagsHistory.splice(0, 10)
    this._tagsHistory.unshift(tag);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviUrl}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;

        console.log({gifs: this.gifList})
      })

  }

  // async searchTag(tag:string):Promise<void>{

  //   if(tag.length===0) return;
  //   this.organizeHistory(tag);
  //   this.http.get('https://api.giphy.com/v1/gifs/search?api_key=EnFWRTLnnkSQkrqa1iJJTwUhMSxFrY9b&q=valorant&limit=10')

  //   // fetch('https://api.giphy.com/v1/gifs/search?api_key=EnFWRTLnnkSQkrqa1iJJTwUhMSxFrY9b&q=valorant&limit=10')
  //   // .then(resp => resp.json())
  //   // .then(data=> console.log(data))

  //   // const resp=await fetch('https://api.giphy.com/v1/gifs/search?api_key=EnFWRTLnnkSQkrqa1iJJTwUhMSxFrY9b&q=valorant&limit=10')
  //   // const data=await resp.json();
  //   // console.log(data)
  // }




}
