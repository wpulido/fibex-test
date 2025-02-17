import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitted = false;
  storedCredentials = {email: 'admin@example.com', password: '123456'};

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get formControls() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    if(email === this.storedCredentials.email && password === this.storedCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      alert("Login successful");
      this.router.navigate(['dashboard']);
    } else {
      alert("Invalid email or password");
    }
  }

  isLoggedIn():boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    alert("Logged out");
    this.router.navigate(['login']);

  }
}



