import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import {  AuthenticationService } from '../services/authentication.service';
import { UserService} from '../services/user.service'
import { first } from 'rxjs/operators';
import { JWT } from '../models/jwt';
import { HomeFiction } from '../models/HomeFiction';
import { FictionService } from '../services/fiction.service';
import { StoriesService } from '../services/stories-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit  {
  user: JWT;
  userFromApi: JWT;
  fictons : HomeFiction [];

  
  constructor(private fictionService : StoriesService

) { 


}

  ngOnInit(): void {
  this.fictionService.getAllFictions().subscribe(data => {
 this.fictons = data;
 
  })
  }
}








