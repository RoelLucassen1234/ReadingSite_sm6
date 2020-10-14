import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin';
import { AuthGuard } from './_helpers';
import { Role } from './models';

const routes: Routes = [
 // {path: '404', component: NotFoundComponent},
 {path: '*', redirectTo: '/home'},
  {path: 'home' , component: HomeScreenComponent},
   {path: 'login', component: LoginComponent},
  {path: 'testlogin', component: LoginComponent},
  {path: 'testhome', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles : [Role.Admin]} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
