import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {  UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Role } from '../models';








@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  notsame = false;
  submitted = false;
  returnUrl: string;
  error = '';

  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService


  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose( [Validators.required, Validators.pattern("^[a-zA-Z0-9]$")])],
      email: ['', Validators.required],
      password: ['',  [ Validators.required, Validators.pattern("[A-Za-z0-9\-\_\#\@\!\^\&\*\(\)]+")]],
      confirmPassword: ['', [Validators.required]],

    }), { validator: this.checkPasswords(this.loginForm) };
  }

  ngOnInit() {


  }



  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
console.log("email: "+ this.f.email.value);
console.log("password: "+this.f.password.value);
console.log("username: " + this.f.username.value);


    this.checkPasswords(this.loginForm);
console.log(this.notsame);

if (!this.notsame) {
      this.loading = true;
      this.userService.register(this.f.email.value, this.f.password.value, this.f.username.value, Role.User)
      .subscribe(
          data => {
            this.router.navigate(['/login']);
          },
          error => {
            this.error = error;
            if(error == "OK"){
              this.router.navigate(['/login']);
            }

            this.loading = false;
          });
    }else{
      
        this.error = "Make sure that password and confirm password match"
      
    }
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group

    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    console.log(pass);
    console.log(confirmPass);

    if(pass == confirmPass){
   this.notsame = false;
    }else{
   this.notsame = true;
    }   
  }


}

