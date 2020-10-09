import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { LoginModel } from '../models/loginModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false; 
    changePage : Boolean;
    submitted = false;
    error = '';
    login : LoginModel;

    constructor(
        
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
        
    ) { 
        // redirect to home if already logged in
        console.log('uservalue = ' + this.authenticationService.userValue);
        if(this.authenticationService.userValue != null)
        this.router.navigateByUrl("/home");
    
    }

 
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.compose( [Validators.required, Validators.pattern("^([A-Za-z0-9\-\_]+)")])],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
    
        this.changePage = false;
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
        window.location.reload();
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });

          
    }
}
