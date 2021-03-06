import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  filtersLoaded: Promise<boolean>;
  verified: Boolean;
  isRole: String;
  username: String;
  constructor(private authenticationservice: AuthenticationService) { }

  ngOnInit(): void {
  
    this.isVerifiedUser();
   
  }

  getUserIsLoggedIn(){
  return this.authenticationservice.userValue != null;
}

  isVerifiedUser(){
   
    if (this.authenticationservice.userValue != null){
      const user = this.authenticationservice.userValue;
      this.isRole = user.role;
      this.verified = true;
    }else{
      this.verified = false;
    }
    // this.authenticationservice.verify().subscribe(data => {
    //   this.verified = true;
    //   this.update();
    // });
  }
  

  logout() {
    this.authenticationservice.logout();
    window.location.reload();
  }

  update() {

    if (this.verified) {
      const user = this.authenticationservice.userValue;
      this.isRole = user.role;
    } else {
      this.logout();
      console.log("Not Verified");
    }
    this.filtersLoaded = Promise.resolve(true);
  
  }


}
