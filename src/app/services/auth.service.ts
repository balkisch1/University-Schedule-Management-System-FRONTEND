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
    // Vous pouvez ici rediriger vers la page de connexion ou afficher un message d'erreur
  }
  return user?.id || 0;  // Retourne 0 si aucun utilisateur n'est trouvé
}

getUser() {
  const user = localStorage.getItem('user');  // Supposons que l'utilisateur est stocké sous la clé 'user'
  return user ? JSON.parse(user) : null;  // Parse le JSON si l'utilisateur existe
}





  logout(id: number): Observable<boolean> {
    // Supprimer les cookies
    this.cookieService.delete('username');
    this.cookieService.delete('userId');

    return this.http.get<boolean>(`${environment.backendHost}/auth/logout/${id}`);
  }
}
