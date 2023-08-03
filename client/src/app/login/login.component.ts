import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import{Router} from '@angular/router'
import { UiService } from '../ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  signin:boolean=false;
  constructor(
    private fb: FormBuilder,private service:ApiService,public dailog:MatDialog,private route:Router,private ui:UiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
   
  openDialog(){
    this.dailog.open(SignupComponent)
  }
  
  onSubmit(){
    this.signin = true;
    setTimeout(() => {
      this.signin=false;
    }, 2000);
    
   this.service.loginData(this.loginForm.value).subscribe(
    (res: any) => {
      if (res) {
        this.route.navigate(['flight']);
        this.service.loginStatus=true;
        this.ui.showPositive('Login Successfully');
        localStorage.setItem('user_id',this.loginForm.value.email);
        this.loginForm.reset();
      }
    },
    (err: any) => {
      if (err) {
        if (err.error) this.ui.showNegative(err.error);
      }
    }
  );
 
   


  }
}
