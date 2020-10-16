import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User, Role } from '../models';
import { UserView } from '../models/userview';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    user : UserView;
    constructor(private http: HttpClient, private restServer: RestService) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    register(email: string, password : string, username: string, role : Role) {
        this.user = new UserView();
        this.user.username = username;
        this.user.role = role;
        this.user.email = email;
        this.user.password = password;
 
        
        return this.http.post(this.restServer.getRestUrl() + '/auth/user', this.user);
      }
}