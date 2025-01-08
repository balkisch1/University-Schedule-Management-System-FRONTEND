import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { EtudiantService } from '../services/etudiant.service';

@Component({
  selector: 'app-loginetudiant',
  templateUrl: './loginetudiant.component.html',
  styleUrls: ['./loginetudiant.component.css']
})
export class LoginetudiantComponent implements OnInit {
  formGroup!: FormGroup;
  passwordVisible = false;
  errorMessage!: string;

  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Accessors for the form controls
  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Method for login
  loginf() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Mark all form controls as touched
      return;
    }

    const username = this.username?.value;
    const password = this.password?.value;

    this.etudiantService.loginf(username, password).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Login successful:', response);

          // Assign response data to the service
          this.etudiantService.loggedIn = true;
          this.etudiantService.isEtudiant = true;
          this.etudiantService.name = `${response.nom} ${response.prenom}`;
          this.etudiantService.token = response.token;
          this.etudiantService.id = response.id;

          // Store data in cookies
          this.cookieService.set('username', this.etudiantService.name);
          this.cookieService.set('userId', this.etudiantService.id.toString());

          // Redirect to user page
          this.router.navigateByUrl('/user');
          window.location.reload(); 
        } else {
          Swal.fire('Echec', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        Swal.fire('Echec', 'Erreur lors de la connexion. Veuillez réessayer.', 'error');
      }
    });
  }
}
