import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin';
import { AuthGuard } from './_helpers';
import { Role } from './models';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
 // {path: '404', component: NotFoundComponent},
 
  {path: 'home' , component: HomeScreenComponent},
   {path: 'login', component: LoginComponent},
  {path: 'testlogin', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles : [Role.Admin]} },
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'account', component: AccountComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
  // {path: '**', redirectTo: '/home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
