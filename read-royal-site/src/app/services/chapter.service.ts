import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) { }

  getChapter(id : string){
   return this.http.get<any>(`${environment.apiUrl}/chapters/chapter/` + id)
  }
}
