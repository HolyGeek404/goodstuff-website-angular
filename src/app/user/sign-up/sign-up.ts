import {Component, inject} from '@angular/core';
import {GoodStuffFunctionsService} from '../../../services/GoodStuffFunctionsService';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SignUpRequest} from '../../../models/user/SignUpRequest';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  private functionsService = inject(GoodStuffFunctionsService);

  constructor(private router: Router) {
  }

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  errorMessages = {
    name: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters long'
    },
    surname: {
      required: 'Surname is required',
      minLength: 'Surname must be at least 2 characters long'
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required',
      pattern: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
    },
    confirmPassword: {
      required: 'Confirm Password is required',
      mismatch: 'Passwords do not match'
    }
  };


  errors: string[] = [];

  onSubmit() {
    if (this.validate() && this.signUpForm.valid) {
      const signUp: SignUpRequest = {
        Name: this.signUpForm.controls.name.value!,
        Surname: this.signUpForm.controls.surname.value!,
        Email: this.signUpForm.controls.email.value!,
        Password: this.signUpForm.controls.password.value!
      }
      console.log(signUp);
      this.functionsService.signUp(signUp).subscribe({
        next: () => this.router.navigate(['/user/sign-in']),
        error: () => this.errors.push("Services temporary unavailable")
      });
    }
  }

  validate(): boolean {
    this.errors = [];
    let isValid = true;

    // Validate Name
    const nameCtrl = this.signUpForm.controls.name;
    if (!nameCtrl.valid) {
      if (nameCtrl.errors!['required']) {
        this.errors.push(this.errorMessages.name.required);
        isValid = false;
      }
      if (nameCtrl.errors!['minlength']) {
        this.errors.push(this.errorMessages.name.minLength);
        isValid = false;
      }
    }

    // Validate Surname
    const surnameCtrl = this.signUpForm.controls.surname;
    if (!surnameCtrl.valid) {
      if (surnameCtrl.errors!['required']) {
        this.errors.push(this.errorMessages.surname.required);
        isValid = false;
      }
      if (surnameCtrl.errors!['minlength']) {
        this.errors.push(this.errorMessages.surname.minLength);
        isValid = false;
      }
    }


    // Validate email
    const emailCtrl = this.signUpForm.controls.email;
    if (!emailCtrl.valid) {
      if (emailCtrl.errors!['required']) {
        this.errors.push(this.errorMessages.email.required);
        isValid = false;
      }
      if (emailCtrl.errors!['email']) {
        this.errors.push(this.errorMessages.email.email);
        isValid = false;
      }
    }

    // Validate password
    const passwordCtrl = this.signUpForm.controls.password;
    if (!passwordCtrl.valid) {
      if (passwordCtrl.errors!['required']) {
        this.errors.push(this.errorMessages.password.required);
        isValid = false;
      }
      if (passwordCtrl.errors!['pattern']) {
        this.errors.push(this.errorMessages.password.pattern);
        isValid = false;
      }
    }

    // Validate confirm password
    const confirmCtrl = this.signUpForm.controls.confirmPassword;
    if (!confirmCtrl.valid) {
      if (confirmCtrl.errors!['required']) {
        this.errors.push(this.errorMessages.confirmPassword.required);
        isValid = false;
      }
    }

    // Check password match
    if (passwordCtrl.value !== confirmCtrl.value) {
      this.errors.push(this.errorMessages.confirmPassword.mismatch);
      isValid = false;
    }

    return isValid;
  }
}
