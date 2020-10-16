import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User} from '../models';
import { AuthenticationService } from './authentication.service';
import { DeleteViewModel } from '../models/deleteviewmodel';

@Injectable({ providedIn: 'root' })
export class AdminService {
  
deleteView : DeleteViewModel;

    constructor(private http: HttpClient, private authenticationService : AuthenticationService) { }

    getAll() {
        this.authenticationService.verify();
        return this.http.get<User[]>(`${environment.apiUrl}/admin/users/${this.authenticationService.userValue.token}`);
    }

    deleteUser(id : string) {
        
        console.log(this.deleteView);
        return this.http.delete(`${environment.apiUrl}/admin/user/delete/` +  id);
    }

}