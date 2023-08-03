import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  Details!: FormGroup;
  constructor(
    public dialog: MatDialog,
    public service: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.Details = this.fb.group({
      name: ['', Validators.required],
      airport: ['', [Validators.required, Validators.email]],
    });
  }

  email: any;
  ngOnInit() {
    this.email = localStorage.getItem('user_id');
    this.service.isUserLoggedIn();
  }

  openDialog() {
    this.dialog.open(SignupComponent);
  }

  onSubmit() {
    this.service.Data(this.Details.value).subscribe((res) => {
      console.log(res);
    });
    this.Details.reset();
  }
  flightPage() {
    this.router.navigate(['/flight']);
  }
  trainPage() {
    this.router.navigate(['/train']);
  }
}
