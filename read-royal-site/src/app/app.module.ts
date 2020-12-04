import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule, MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { LoginComponent } from './login';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminComponent } from './admin';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { StoriesComponent } from './stories/stories.component';
import {FileUploadModule} from 'primeng/fileupload';
import { SubmissionComponent } from './submission/submission.component'
import {QuillModule} from 'ngx-quill';
import { FictionComponent } from './fiction/fiction.component';
import { ChapterComponent } from './chapter/chapter.component'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeScreenComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ProfileComponent,
    AccountComponent,
    StoriesComponent,
    SubmissionComponent,
    FictionComponent,
    ChapterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    QuillModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ], exports : [
    MatToolbar
  ],

  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
