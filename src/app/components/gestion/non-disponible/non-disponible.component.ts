import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NonDisponibiliteService } from 'src/app/services/non-desponibilitie.service';
import { NonDisponibilite } from 'src/app/models/nonDisponibilites.models';
import { AuthService } from 'src/app/services/auth.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { Prof } from 'src/app/models/prof.models';

@Component({
  selector: 'app-non-disponibilite',
  templateUrl: './non-disponible.component.html',
  styleUrls: ['./non-disponible.component.css']
})
export class NonDisponibleComponent implements OnInit {
  nonDisponibiliteForm!: FormGroup;
  prof: Prof | undefined;
  enseignantId: any;
  nonDisponibilites: any[] = [];

  constructor(
    private fb: FormBuilder,
    private nonDisponibiliteService: NonDisponibiliteService,
    private authService: AuthService,
    private profService: ProfServiceService
  ) { 
    this.loadNonDisponibilites();
  }
  loadNonDisponibilites(): void {
    this.nonDisponibiliteService.getNonDisponibilites().subscribe(
      (data) => {
        this.nonDisponibilites = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des non-disponibilités", error);
      }
    );
  }
  ngOnInit() {
    // Initialize the form with default values and validators
    this.nonDisponibiliteForm = this.fb.group({
      enseignantId: [0],  // Bind `enseignant_id` as a form control with a default value
      jour: ['', Validators.required],
      periode: ['', Validators.required],
    });

    // Retrieve the current user's teacher ID from AuthService
    this.enseignantId = this.authService.getCurrentUserId();
    console.log('Enseignant ID:', this.enseignantId);

    // Update the form's `enseignant_id` value
    this.nonDisponibiliteForm.patchValue({ enseignantId: this.enseignantId });
  }

  onSubmit(): void {
    console.log('Bouton Submit cliqué');
    console.log('Form data:', this.nonDisponibiliteForm.value);
  
    // Ajoute l'ID de l'enseignant au formulaire avant d'envoyer la requête
    const formData = { 
      ...this.nonDisponibiliteForm.value, 
      enseignant: { id: this.enseignantId }  // Assure-toi que l'ID de l'enseignant est bien envoyé
    };
  
    // Envoie la requête au backend
    this.nonDisponibiliteService.addNonDisponibilite(formData).subscribe(
      (response) => {
        alert('Non-disponibilité ajoutée avec succès!');
        console.log('Réponse du serveur:', response);
  
        // Ajouter la nouvelle non-disponibilité à la liste locale
        this.nonDisponibilites.push(response);
  
        // Réinitialiser le formulaire
        this.nonDisponibiliteForm.reset();
        if (this.enseignantId) {
          this.nonDisponibiliteForm.patchValue({ enseignantId: this.enseignantId });
        }
  
        // Recharger les non-disponibilités
        this.loadNonDisponibilites();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la non-disponibilité:', error);
        alert('Une erreur est survenue.');
      }
    );
  }
  
  deleteNonDisponibilite(id: number): void {
    this.nonDisponibiliteService.deleteNonDisponibilite(id).subscribe(
      () => {
        this.nonDisponibilites = this.nonDisponibilites.filter(nonDispo => nonDispo.id !== id);
      },
      (error) => {
        console.error("Erreur lors de la suppression de la non-disponibilité", error);
      }
    );
  }
  
}
  