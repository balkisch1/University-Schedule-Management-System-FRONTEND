import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any = null; 
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isEtudiant: boolean = false;
  public isProf: boolean = false;
  public name: string = "";
  public token: string = "";
  public id: number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Méthode de login
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
  
    return this.http.post<any>(`${environment.backendHost}/auth/login`, loginData)
      .pipe(
        tap((response: any) => {
          if (response && response.user) {
            // Assurez-vous que l'ID est bien dans la réponse
            console.log('Utilisateur connecté:', response.user);  // Vérifiez dans la console
            localStorage.setItem('user', JSON.stringify(response.user)); // Sauvegarde l'utilisateur dans localStorage
          }
        })
      );
  }
  
  
  
  // Récupérer l'ID de l'enseignant depuis localStorage
// auth.service.ts
getCurrentUserId(): number {
  const user = this.getUser();
  if (!user) {
    console.warn('Aucun utilisateur connecté.');
    return 0; // Retourne 0 si aucun utilisateur n'est trouvé
  }
  return user.id; // Retourne l'ID de l'utilisateur connecté
}

  getUser() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user;
  }
  





  logout(id: number): Observable<boolean> {
    // Supprimer les cookies
    this.cookieService.delete('username');
    this.cookieService.delete('userId');

    return this.http.get<boolean>(`${environment.backendHost}/auth/logout/${id}`);
  }
}
