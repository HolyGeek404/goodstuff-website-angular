import { Component } from '@angular/core';
import {EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  email = new FormControl();
  password = new FormControl();

  onSubmit()
  {


  }
}
