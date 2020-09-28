import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import {  AuthenticationService } from '../services/authentication.service';
import { UserService} from '../services/user.service'
import { first } from 'rxjs/operators';
declare var jQuery: any;

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit  {
  user: User;
  userFromApi: User;

  
  constructor( private userService: UserService,
    private authenticationService: AuthenticationService
) { 
  this.user = this.authenticationService.userValue;

}

  ngOnInit(): void {
    this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
    
      this.userFromApi = user;
  });
  }
}








