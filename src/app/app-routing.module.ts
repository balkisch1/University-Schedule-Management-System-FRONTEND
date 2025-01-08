import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { HomeComponent } from './components/home/home.component';
import { GestionFiliereComponent } from './components/gestion/gestion-filiere/gestion-filiere.component';
import { AddNewFiliereComponent } from './components/add/add-new-filiere/add-new-filiere.component';
import { AddNewDepartementComponent } from './components/add/add-new-departement/add-new-departement.component';
import { GestionClasseComponent } from './components/gestion/gestion-classe/gestion-classe.component';
import { AddNewClasseComponent } from './components/add/add-new-classe/add-new-classe.component';
import { GestionSallesComponent } from './components/gestion/gestion-salles/gestion-salles.component';
import { AddNewSalleComponent } from './components/add/add-new-salle/add-new-salle.component';
import {TimetableComponent} from "./components/timetable/timetable.component";
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { GestionDepartmentComponent } from './components/gestion/gestion-departement/gestion-departement.component';
import { EditDepartementComponent } from './components/edit/edit-departement/edit-departement.component';
import { EditSalleComponent } from './components/edit/edit-salle/edit-salle.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import {EditFiliereComponent} from "./components/edit/edit-filiere/edit-filiere.component";
import {EditClasseComponent} from "./components/edit/edit-classe/edit-classe.component";
import { EditProfileComponent } from './components/edit/edit-profile/edit-profile.component';
import { NonDisponibleComponent } from './components/gestion/non-disponible/non-disponible.component';

import { AppComponent } from './components/dashboard/app.component';
import { AboutComponent } from './components/about/about.component';
import { UserComponent } from './components/user/user.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './components/widgets/login/login.component';
import { LoginetudiantComponent } from './loginetudiant/loginetudiant.component';
import { GestionEtudiantComponent } from './components/gestion/gestion-etudiant/gestion-etudiant.component';
import { AddNewEtudiantComponent } from './components/add/add-new-etudiant/add-new-etudiant.component';
import { EditEtudiantComponent } from './components/edit/edit-etudiant/edit-etudiant.component';
const routes: Routes = [
  { path :'' , component: HomeComponent},
  { path: 'dashboard', component: AppComponent }, 
  { path :'index' , component: IndexPageComponent},
   // Page du formulaire
   { path: 'login', component: LoginComponent },
   { path: 'loginetudiant', component: LoginetudiantComponent },
   { path: 'register', component: RegisterFormComponent }, // Ajoutez cette ligne
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: '', redirectTo: '/loginetudiant', pathMatch: 'full' },
    { path :'home' , component: HomeComponent},
    { path :'profs' , component: GestionProfComponent},
    { path :'profs/add' , component: AddNewProfComponent},

    { path :'gestetud' , component: GestionEtudiantComponent},
    { path :'etudiants/add' , component:AddNewEtudiantComponent },
    { path :'etudiants/edit' , component:EditEtudiantComponent },




    { path :'filieres' , component: GestionFiliereComponent},
    { path :'filieres/add' , component: AddNewFiliereComponent},
    { path :'departements' , component: GestionDepartmentComponent},
    { path :'departements/add' , component: AddNewDepartementComponent},
    { path :'classes' , component: GestionClasseComponent},
    { path :'classes/add' , component: AddNewClasseComponent},
    { path :'salles' , component: GestionSallesComponent},
    { path :'salles/add' , component: AddNewSalleComponent},
    { path :'emploitemps' , component: TimetableComponent},
    {path:'profs/edit',component:EditProfComponent},
    { path :'departements/edit' , component: EditDepartementComponent},
    { path :'salles/edit' , component: EditSalleComponent},
    { path :'filieres/edit' , component: EditFiliereComponent},
    { path :'classes/edit' , component: EditClasseComponent},
    { path :'profile/edit' , component: EditProfileComponent},
    { path :'nonDesponibles' , component: NonDisponibleComponent},
    { path: 'about', component: AboutComponent }, 
    { path: 'user', component: UserComponent }, 

    // not-found
    { path :'**' , component: NotFoundComponent},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
