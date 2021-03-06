﻿import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { JWT } from '../models/jwt';
import { AuthenticationService } from './authentication.service';
import { AvatarSwap } from '../models/AvatarSwap';
import { UpdateTokenView } from '../models/UpdateTokenView';
import { UsernameSwap } from '../models/usernameSwap';
import { BioSwap } from '../models/bioSwap';

@Injectable({ providedIn: 'root' })
export class ProfileService {
   
    constructor(
        private router: Router,
        private http: HttpClient, private authentication: AuthenticationService
    ) {
    }

   
    getProfile(){
        console.log(this.authentication.userValue.token);
        return this.http.get<UpdateTokenView>(`${environment.apiUrl}/profile/get/` + this.authentication.userValue.token);
    }

    saveAvatarImage(swap : AvatarSwap) {
    console.log("Hello");
      return this.http.post<any>(`${environment.apiUrl}/profile/edit/avatar`, swap)

      }
      saveUsername(swap : UsernameSwap) {
        return this.http.post<any>(`${environment.apiUrl}/profile/edit/username`, swap);

      }

      saveBio(swap : BioSwap) {
        return this.http.post<any>(`${environment.apiUrl}/profile/edit/description`, swap);

      }

   
}