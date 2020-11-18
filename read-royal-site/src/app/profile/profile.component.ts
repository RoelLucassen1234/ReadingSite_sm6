import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  profileName : String;
  isProfile : Boolean = false;
  constructor(private route: ActivatedRoute, private authorization : AuthenticationService) { }

  ngOnInit(): void {
 
   this.route.params.subscribe(params =>{
    this.profileName = params.username
   })
   this.isUserProfile();
    
  }

  isUserProfile(){
    this.authorization.verify();
    if (this.authorization.user != null){
      if (this.authorization.userValue != null)
      if (this.authorization.userValue.username == this.profileName){
this.isProfile = true;
      }
    }
  }

}
