import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  formGroup!: FormGroup;
  passwordVisible = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    if (this.formGroup.invalid) {
      // Mark form controls as touched to display validation errors
      this.formGroup.markAllAsTouched();
      return;
    }
  
    const username = this.username?.value;
    const password = this.password?.value;
  
    this.authService.login(username, password).subscribe(response => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      if (response.success) {
        console.log('Login successful:', response);
  
        // Assign response data to authService properties
        this.authService.loggedIn = response.success;
        this.authService.isAdmin = response.admin;
        this.authService.isProf = response.prof;
        this.authService.name = `${response.nom} ${response.prenom}`;
        this.authService.token = response.token;
        this.authService.id = response.id;
  
        // Store data in cookies
        this.cookieService.set('username', this.authService.name);
        this.cookieService.set('userId', this.authService.id.toString());
        const role = response.admin ? 'Administrateur' : response.prof ? 'Enseignant' : 'Utilisateur';
        this.cookieService.set('role', role);
  
        // Navigate to home page after successful login
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire('Echec', 'Nom d\'utilisateur ou mot de passe incorrect', 'error');
      }
    }, error => {
      console.error('Login error:', error);
      Swal.fire('Echec', 'Erreur lors de la connexion. Veuillez réessayer.', 'error');
    });
  }

  loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Utilisateur connecté via Google:', result.user);
        // Additional handling for Google login can be added here
      })
      .catch((error) => {
        console.error('Erreur de connexion Google:', error);
        Swal.fire('Echec', 'Erreur lors de la connexion Google.', 'error');
      });
  }


}
