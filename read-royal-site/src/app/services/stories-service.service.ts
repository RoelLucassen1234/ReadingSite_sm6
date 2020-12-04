import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FictionInfo } from '../models/FictionInfo';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(  private router: Router,
    private http: HttpClient, private authentication: AuthenticationService) { }



    createFiction(data){
      return this.http.post<any>(`${environment.apiUrl}/fiction/add`, data);

    }
     getAllFictions(){
       return this.http.get<any>(`${environment.apiUrl}/fiction/all`);
     }
    deleteFiction(){

    }

    getFiction(id : String){
      return this.http.get<any>(`${environment.apiUrl}/fiction/get/` + id);
    }
}
