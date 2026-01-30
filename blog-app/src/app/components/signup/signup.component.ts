import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ← ДОДАНО

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  create() {
    this.authService.createOrUpdate(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/blog']);
      },
      error: (err) => {
        console.error('Błąd rejestracji:', err);
      }
    });
  }
}