import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  active:number=0;
   sidebarItems:any[] = [];

  sidebarAdminItems = [
  {
    link: "/home",
    title: "Home",
    icon: "fas fa-home"
  },
  {
    link: "/gestetud",
    title: "Etudiants",
    icon: "fas fa-clipboard-list"
  },
  {
    link: "/classes",
    title: "Classes",
    icon: "fas fa-graduation-cap"
  },
  {
    link: "/profs",
    title: "Professeurs",
    icon: "fas fa-chalkboard-teacher"
  },
  {
    link: "/departements",
    title: "Départments",
    icon: "fas fa-building"
  },
  {
    link: "/filieres",
    title: "Filières",
    icon: "fas fa-book-reader"
  },
  {
    link: "/salles",
    title: "Salles",
    icon: "fas fa-clipboard"
  }
];

sidebarProfItems = [
  {
    link: "/home",
    title: "Acceuil",
    icon: "fas fa-home"
  },
  {
    link: "/emploitemps",
    title: "Emploi du temps",
    icon: "fas fa-clipboard-list"
  },
  {
    link: "/nonDesponibles",
    title: "Non Disponibilités",
    icon: "fas fa-clipboard-list"
  }, 
]



sidebarEtudiantItems = [
  
  {
    link: "/user",
    title: "Emploi du temps",
    icon: "fas fa-clipboard-list"
  },
  





  
]


  constructor(private cookieService: CookieService) { }

  handleChangeBars(index: number): void {
  this.active = index;
}
ngOnInit(): void {
  const userRole = this.cookieService.get('role');
  console.log("Rôle de l'utilisateur:", userRole);  // Affiche le rôle dans la console
  
  if (userRole === "Administrateur") {
    this.sidebarItems = this.sidebarAdminItems;
  } else if (userRole === "Enseignant") {
    this.sidebarItems = this.sidebarProfItems;
  } else {
    this.sidebarItems = this.sidebarEtudiantItems;
  } 
}

isSidebarHidden: boolean = false;

toggleSidebar() {
  this.isSidebarHidden = !this.isSidebarHidden;
}

}