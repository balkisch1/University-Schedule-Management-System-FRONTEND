// role.service.ts
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject = new BehaviorSubject<string>('');

  constructor(private cookieService: CookieService) {
    const role = this.cookieService.get('role');
    this.roleSubject.next(role);  // Initialiser avec le rôle du cookie
  }

  get role$() {
    return this.roleSubject.asObservable();  // Fournir un Observable pour le rôle
  }

  setRole(role: string) {
    this.cookieService.set('role', role);  // Mettre à jour le cookie
    this.roleSubject.next(role);  // Émettre le nouveau rôle
  }
}
