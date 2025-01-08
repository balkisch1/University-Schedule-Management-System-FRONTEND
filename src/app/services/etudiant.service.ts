// etudiant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ElementDeModule } from 'src/app/models/elementModule.models';
import { Etudiant } from '../models/etudiant.model';
import { PageEtudiant } from '../models/profPage.models';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {


  private user: any = null; 
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isEtudiant: boolean = false;
  public isProf: boolean = false;
  public name: string = "";
  public token: string = "";
  public id: number = 0;
  private baseUrl = 'http://localhost:8000/api';
  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  // Méthode de login
  loginf(username: string, password: string): Observable<any> {
    const loginData = { username, password };
  
    return this.http.post<any>(`http://localhost:8000/api/etudiants/login`, loginData)
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
  // Récupérer la classe de l'étudiant connecté
  getClasseOfEtudiant(id: string) {
    return this.http.get(`http://localhost:8000/api/etudiants/classe/${id}`, { responseType: 'text' });
  }

  // Récupérer l'ID de la classe par son nom
  getClasseIdByName(nom: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/classes/nom/${nom}`);
  }

  // Récupérer l'emploi du temps de la classe par son ID
  getEmploisByClasse(id: number): Observable<ElementDeModule[]> {
    return this.http.get<ElementDeModule[]>(`${this.baseUrl}/emploisDeTemps/${id}`);
  }

  searchEtudiants(keyword: string, page: number, size: number) {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<any>(`${this.baseUrl}/etudiants`, { params });
  }
  

  public saveEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${environment.backendHost}/etudiants`, etudiant);
  }

  public updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${environment.backendHost}/etudiants/${id}`, etudiant);
  }

  public getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${environment.backendHost}/etudiants/${id}`);
  }
  public getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${environment.backendHost}/etudiants`);
  }

  public deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${environment.backendHost}/etudiants/${id}`);
  }

  // Méthode pour gérer les erreurs HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur - Code: ${error.status}, Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

















