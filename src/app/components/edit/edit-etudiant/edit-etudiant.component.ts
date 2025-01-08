import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant.model';
import { EtudiantService } from 'src/app/services/etudiant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.css']
})
export class EditEtudiantComponent implements OnInit {
  editEtudiantFormGroup!: FormGroup;
  etudiant!: Etudiant;

  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.etudiant = this.router.getCurrentNavigation()?.extras.state as Etudiant;
  }

  ngOnInit(): void {
    this.editEtudiantFormGroup = this.fb.group({
      prenom: [''],
      nom: [''],
      login: [''],
      tel: [''],
      cne: [''],
      password: [''],
      role: [''],
      classe: ['']
    });

    this.setFormValues();
  }

  setFormValues() {
    if (this.etudiant) {
      this.editEtudiantFormGroup.patchValue({
        prenom: this.etudiant.prenom,
        nom: this.etudiant.nom,
        login: this.etudiant.login,
        tel: this.etudiant.tel,
        cne: this.etudiant.cne,
        password: this.etudiant.password,
        role: this.etudiant.role,
        classe: this.etudiant.classe
      });
    }
  }

  handleUpdateEtudiant() {
    if (this.editEtudiantFormGroup.valid && this.etudiant) {
      const updatedEtudiant: Etudiant = {
        ...this.etudiant,
        ...this.editEtudiantFormGroup.value
      };

      this.etudiantService.updateEtudiant(updatedEtudiant.id, updatedEtudiant).subscribe(
        (data) => {
          Swal.fire('Succès', 'Étudiant modifié avec succès', 'success');
          this.router.navigateByUrl('/etudiants');
        },
        (error) => {
          Swal.fire('Erreur', 'Échec de la modification de l\'étudiant', 'error');
        }
      );
    }
  }
}
