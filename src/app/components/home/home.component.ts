import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/roleService';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prof!: boolean;

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    // Souscrire à l'état du rôle pour être réactif aux changements
    this.roleService.role$.subscribe(role => {
      this.prof = (role === 'Enseignant');
    });
  }
}
