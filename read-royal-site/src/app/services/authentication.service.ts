import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { JWT } from '../models/jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<JWT>;
    public user: Observable<JWT>;
    token : String = "";
    jwt : JWT;
    verified: boolean;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<JWT>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): JWT {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        
        return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password })
            .pipe(map(user  => { 
            // store user details and jwt token in local storage to keep user logged in between page refreshes
               console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    verify(){
      
     //  console.log(`${environment.apiUrl}/auth/verify/` + this.userValue.token);
       return this.http.get<any>(`${environment.apiUrl}/auth/verify/` + this.userValue.token).pipe(
       
       )
   
    }

    logout() {
        // remove user from local storage to log user out
        
        localStorage.removeItem('user');
        this.userSubject.next(null);
       // this.router.navigate(['/login']);
    }
}