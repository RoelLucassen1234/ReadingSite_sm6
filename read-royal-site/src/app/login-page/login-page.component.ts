import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
){
  //Redirect naar home pagina als je al bent ingelogd
  
}

 

  ngOnInit(): void {
  
  }

  get loginInfo() { return this.loginForm.controls; }

  onSubmit() {
  
}




}

