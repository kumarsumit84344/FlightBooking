import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  form!: FormGroup;

  constructor(private fb: FormBuilder,private http:HttpClient) {}
  ngOnInit() {
    this.form = this.fb.group({
      name: '',
      email: '',
      dateOfBirth: '',
      password: '',
      file:'',
    });
  }
  onSubmit() {
    console.log(this.form.value.file);
    this.http.post('http://localhost:3000/upload',this.form.value.file)

  }


}
