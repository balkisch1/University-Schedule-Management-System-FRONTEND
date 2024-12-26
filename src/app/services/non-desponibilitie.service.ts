// src/app/services/non-disponibilite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NonDisponibilite } from '../models/nonDisponibilites.models';

@Injectable({
  providedIn: 'root'
})
export class NonDisponibiliteService {

  private apiUrl = 'http://localhost:8000/api/nonDisponibilites';  // Change to your backend URL

  constructor(private http: HttpClient) { }

  // Method to add NonDisponibilite
  public addNonDisponibilite(nonDisponibilite: NonDisponibilite): Observable<NonDisponibilite> {
    return this.http.post<NonDisponibilite>(this.apiUrl, nonDisponibilite);
  }
  getNonDisponibilitesByEnseignant(enseignantId: number): Observable<NonDisponibilite[]> {
    return this.http.get<NonDisponibilite[]>(`${this.apiUrl}/${enseignantId}`);
  }
  
  getNonDisponibilites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getNonDisponibiliteById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteNonDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateNonDisponibilite(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { /* Données à mettre à jour */ });
  }
}