import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { JWT } from '../models/jwt';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LoginModel } from '../models/loginModel';
import { NgModel } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<JWT>;
    public user: Observable<JWT>;
    token: string = "";
    jwt: JWT;
    verified: boolean;
    constructor(
        private router: Router,
        private http: HttpClient,
        private recaptchaV3Service: ReCaptchaV3Service
    ) {
        this.userSubject = new BehaviorSubject<JWT>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): JWT {
        return this.userSubject.value;
    }

    login(username: string, password: string, token: string) {
       
        let model= new LoginModel;
console.log(token);

        // this.getRecaptchaToken("Login").subscribe(token => {
        //     caption = token;
            model.caption = token;
            model.username = username;
            model.password = password;

        // })
        return this.http.post<any>(`${environment.apiUrl}/auth`, model)
        .pipe(map(jwt => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.createJWT(jwt);
            console.log(localStorage.getItem('user'));
            return jwt;
        }));



    }

    verify() {
        //  console.log(`${environment.apiUrl}/auth/verify/` + this.userValue.token);
        if (this.userValue != null) {
            return this.http.get<any>(`${environment.apiUrl}/auth/verify/` + this.userValue.token).pipe(map(jwt => {
                localStorage.setItem('user', JSON.stringify(jwt));
                this.userSubject.next(jwt);
            })

            )
        }
    }

    createJWT(jwt: any) {
        localStorage.setItem('user', JSON.stringify(jwt));
        this.userSubject.next(jwt);
    }


    logout() {
        // remove user from local storage to log user out

        localStorage.removeItem('user');
        this.userSubject.next(null);

    }


    private getRecaptchaToken(action: string) {
        let captchatoken : string;
        return this.recaptchaV3Service.execute(action);

    }
}