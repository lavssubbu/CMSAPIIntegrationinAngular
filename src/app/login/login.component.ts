import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../User';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    userId:0,
    userName: '',
    email:'',
    password: '',
    role:''
  }

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    console.log(this.user.email, this.user.password);
    if (this.user.email && this.user.password) {
      this.authService.login(this.user).subscribe(
        data => {
          console.log(data)
         const token = data?.token;
         const role =  data?.role;
         console.log(token) // Directly get the token from API response
          if (token) {
            localStorage.setItem('token', token); 
            localStorage.setItem('role', role);// Store the token directly
            console.log('Token stored');
            console.log(localStorage.getItem('token'));
            this.router.navigate(['/books']); // Navigate to the products component
          } else {
            console.log('No token found in API response.');
            alert("Failed to retrieve token.");
          }        
        },
        error => {
          console.error('Login error:', error);
          alert("Invalid login details or server error");
        }
      );
    } else {
      alert("Please enter username and password first");
    }
  }
}
