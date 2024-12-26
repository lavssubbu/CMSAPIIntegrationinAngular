import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  role: string | null = null;
  loggedin :boolean=false;
  constructor(private router: Router,private authser:AuthService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
     // Subscribe to the userRole$ observable from AuthService
     this.authser.userRole$.subscribe(role => {
      this.loggedin = role === 'Admin' || role === 'User'; // Update the loggedin status based on the role
    });
  }

  logout() {
    // Clear local storage and redirect to login page
    
    this.authser.logout();
    this.router.navigate(['/login']);
  }
}
