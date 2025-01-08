import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-etudiant',
  templateUrl: './add-new-etudiant.component.html',
  styleUrls: ['./add-new-etudiant.component.css']
})
export class AddNewEtudiantComponent implements OnInit {
  newEtudiantFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private etudiantService: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    this.newEtudiantFormGroup = this.fb.group({
      nom: [null, [Validators.required]],
      prenom: [null, [Validators.required]],
      cne: [null, [Validators.required]],
      tel: [null, [Validators.required]],
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
      classe: [null, [Validators.required]],
      role: ['Etudiant', [Validators.required]] // Valeur par défaut
    });
  }

  handleAddEtudiant(): void {
    if (this.newEtudiantFormGroup.valid) {
      const newEtudiant: Etudiant = this.newEtudiantFormGroup.value;
      this.etudiantService.saveEtudiant(newEtudiant).subscribe({
        next: (data: Etudiant) => {
          Swal.fire('Succès', 'Étudiant ajouté avec succès', 'success');
          this.router.navigateByUrl('/gestetud');
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'étudiant', 'error');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement', 'error');
    }
  }
}
