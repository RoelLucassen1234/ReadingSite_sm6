import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login';
import { HomeComponent } from './home';

const routes: Routes = [
  {path: '' , redirectTo: '/home', pathMatch: 'full'},
  {path: 'home' , component: HomeScreenComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'testlogin', component: LoginComponent},
  {path: 'testhome', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
