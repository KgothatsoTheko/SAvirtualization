import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: "", redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'complete-profile', component: CompleteProfileComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
