import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filiere } from '../models/filieres.models';
import { PageFiliere } from '../models/profPage.models';
import {ConsoleLogger} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

   constructor(private http:HttpClient) { }
  public getAllFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${environment.backendHost}/fillieres/all`);
  }
   public getFilieres(page: number, size: number): Observable<PageFiliere> {
    return this.http.get<PageFiliere>(environment.backendHost + "/fillieres?page=" + page + "&size=" + size);
  }
  public searchFilieres(keyword : string,page: number, size: number):Observable<PageFiliere>{
    return this.http.get<PageFiliere>(environment.backendHost+"/fillieres/search?keyword="+keyword+"&page=" + page + "&size=" + size)
  }
  public saveFiliere(Filiere: Filiere):Observable<Filiere>{
    return this.http.post<Filiere>(environment.backendHost+"/fillieres",Filiere);
  }
  public updateFiliere(id: number,Filiere: Filiere):Observable<Filiere>{
     console.log("Update f");
    return this.http.put<Filiere>(environment.backendHost+"/fillieres/"+id,Filiere);
  }
  public getFiliere(id: number):Observable<Filiere>{
    return this.http.get<Filiere>(environment.backendHost+"/fillieres/"+id);
  }
  public deleteFiliere(id: number): Observable<any>{
    return this.http.delete(environment.backendHost+"/fillieres/"+id);
  }
  public getSemsterByFiliere(id: number):Observable<any>{
    return this.http.get(environment.backendHost+"/fillieres/"+id+"/semesters");
  }
}
