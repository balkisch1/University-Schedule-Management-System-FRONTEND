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
  isAddModalVisible: boolean = false; 
  currentDeleteId: number | undefined;
  isModalVisible: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private nonDisponibiliteService: NonDisponibiliteService,
    private authService: AuthService,
    private profService: ProfServiceService
  ) { 
    this.loadNonDisponibilites();
  }

  // Charger les non-disponibilités pour un enseignant
  loadNonDisponibilites(): void {
    if (this.enseignantId) {
      this.nonDisponibiliteService.getNonDisponibilitesByProf(this.enseignantId).subscribe(
        (data: NonDisponibilite[]) => {
          this.nonDisponibilites = data;
          console.log('✅ Non-disponibilités rechargées:', this.nonDisponibilites);
        },
        (error) => {
          console.error('❌ Erreur lors du chargement des non-disponibilités:', error);
        }
      );
    } else {
      console.warn('⚠️ Aucune ID d\'enseignant trouvée.');
    }
  }

  ngOnInit() {
    this.enseignantId = this.authService.getCurrentUserId();
    console.log('Enseignant ID:', this.enseignantId);
  
    if (this.enseignantId) {
      this.loadNonDisponibilites();
    } else {
      console.warn('⚠️ Aucune ID d\'enseignant trouvée.');
    }

    this.nonDisponibiliteForm = this.fb.group({
      enseignantId: [0],
      jour: ['', Validators.required],
      periode: ['', Validators.required],
    });

    this.nonDisponibiliteForm.patchValue({ enseignantId: this.enseignantId });
  }

  // Vérifier si la non-disponibilité existe déjà
  isNonDisponibiliteExist(jour: string, periode: string): boolean {
    return this.nonDisponibilites.some(
      (nonDispo) => nonDispo.jour === jour && nonDispo.periode === periode
    );
  }

  onSubmit(): void {
    console.log('Bouton Submit cliqué');
    console.log('Form data:', this.nonDisponibiliteForm.value);
  
    const formData = { 
      ...this.nonDisponibiliteForm.value, 
      enseignant: { id: this.enseignantId }  // Assure-toi que l'ID de l'enseignant est bien envoyé
    };
  
    // Vérifier si la non-disponibilité existe déjà
    const { jour, periode } = formData;
    if (this.isNonDisponibiliteExist(jour, periode)) {
      alert('Cette non-disponibilité existe déjà pour ce jour et cette période.');
      return; // Ne pas ajouter la non-disponibilité si elle existe déjà
    }

    this.nonDisponibiliteService.addNonDisponibilite(formData).subscribe(
      (response) => {
        alert('Non-disponibilité ajoutée avec succès!');
        console.log('Réponse du serveur:', response);
  
        this.loadNonDisponibilites(); // Recharger les non-disponibilités après l'ajout
        this.nonDisponibiliteForm.reset(); // Réinitialiser le formulaire
        this.nonDisponibiliteForm.patchValue({ enseignantId: this.enseignantId });
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

  openModal(id: number): void {
    this.currentDeleteId = id;
    document.getElementById('confirmDeleteModal')!.style.display = 'flex';
  }

  openAddModal(): void {
    this.isAddModalVisible = true;
  }

  closeModal(): void {
    document.getElementById('confirmDeleteModal')!.style.display = 'none';
  }

  closeAddModal(): void {
    this.isAddModalVisible = false;
  }

  confirmAdd(): void {
    if (this.nonDisponibiliteForm.valid) {
      const formData = this.nonDisponibiliteForm.value;

      // Vérifier si la non-disponibilité existe déjà
      const { jour, periode } = formData;
      if (this.isNonDisponibiliteExist(jour, periode)) {
        alert('Cette non-disponibilité existe déjà pour ce jour et cette période.');
        return;
      }

      this.nonDisponibiliteService.addNonDisponibilite(formData).subscribe(
        () => {
          this.loadNonDisponibilites();
          this.closeAddModal(); // Masquer le modal après ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la non-disponibilité:', error);
        }
      );
    }
  }

  cancelAdd(): void {
    this.closeAddModal(); // Fermer le modal sans ajouter
  }

  confirmDelete(): void {
    if (this.currentDeleteId !== undefined) {
      this.nonDisponibiliteService.deleteNonDisponibilite(this.currentDeleteId).subscribe(
        () => {
          this.loadNonDisponibilites();
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la non-disponibilité:', error);
        }
      );
    }
  }

  cancelDelete(): void {
    this.closeModal();
  }
}
