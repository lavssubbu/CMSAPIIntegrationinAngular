import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Token } from './Token';
import { User } from './User';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7225/api/Token'; // Ensure this is the correct API URL
  private tokenKey = 'jwttoken'; // Use the correct key for localStorage
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) 
  { 
    this.setUserRoleFromToken();
  }

  login(login:User): Observable<Token> {
    console.log("welcome");
    return this.http.post<Token>(this.apiUrl, login).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); 
        this.setUserRoleFromToken(); 
        this.router.navigate(['/']); 
      })
    );    
  }
  setUserRoleFromToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userRoleSubject.next(decodedToken.role || '');
      } catch (e) {
        console.error('Error decoding token:', e);
        this.userRoleSubject.next('');
      }
    } else {
      this.userRoleSubject.next('');
    }
  }  
  getToken(): string | null {
    return localStorage.getItem('token');
    
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  hasRole(requiredRole: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role === requiredRole;
    } catch (e) {
      console.error('Error decoding token:', e);
      return false;
    }
  }
  getUserRole(): string {
    return this.userRoleSubject.value;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
  isUser():boolean{
    return this.getUserRole() === 'User';
  }
  logout() {
    localStorage.removeItem(this.tokenKey);  
    this.userRoleSubject.next('');  
    this.router.navigate(['/login']);  
  }
}
