import { Component, OnInit } from '@angular/core';
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
    console.log(this.authenticationservice.userValue)
    console.log("dsad");
    this.filtersLoaded = Promise.resolve(false);
    if (this.authenticationservice.userValue != null)
      this.authenticationservice.verify().subscribe(data => {
        this.verified = data;
        console.log(this.verified);
        this.update();
      });
    else {
      this.update();
    }
  }

  logout() {
    this.authenticationservice.logout();
  }

  update() {
console.log(this.verified);
    if (this.verified) {
      const user = this.authenticationservice.userValue;
      this.isRole = user.role;

      console.log("Verified");

    } else {


      this.logout();
      console.log("Not Verified");
    }
    this.filtersLoaded = Promise.resolve(true);
  }


}
