import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { JWT } from '../models/jwt';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: JWT;
    userFromApi: JWT;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {

    }
}