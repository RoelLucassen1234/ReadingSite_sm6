import { Component, OnInit } from '@angular/core';
import { JWT } from '../models/jwt';
import { HomeFiction } from '../models/HomeFiction';
import { StoriesService } from '../services/stories-service.service';

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








