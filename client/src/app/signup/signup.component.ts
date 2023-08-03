import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  SignupForm: FormGroup;
  signin: boolean = false;
  constructor(
    private fb: FormBuilder,
    public service: ApiService,
    public dialog: MatDialog
  ) {
    this.SignupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  ngOnInit() {}

  openDialog() {
    this.dialog.open(LoginComponent);
  }
  onSubmit() {
    this.signin = true;
    setTimeout(() => {
      this.signin = false;
    }, 2000);
    this.service.signupData(this.SignupForm.value).subscribe();
    this.SignupForm.reset();
  }
}
