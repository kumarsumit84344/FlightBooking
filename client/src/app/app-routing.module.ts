import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FlightComponent } from './flight/flight.component';
import { TrainComponent } from './train/train.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { FinalticketComponent } from './finalticket/finalticket.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'flight',
    component: FlightComponent,
  },
  {
    path: 'train',
    component: TrainComponent,
  },
  {
    path: 'bookingDetails',
    component: BookdetailsComponent,
  },
  {
    path: 'ConfirmationPage',
    component: FinalticketComponent,
  },
  {
    path: '',
    redirectTo: 'flight',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
