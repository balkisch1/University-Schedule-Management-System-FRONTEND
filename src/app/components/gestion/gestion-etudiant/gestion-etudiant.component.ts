import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from 'src/app/models/etudiant.model';

import { DepartmentService } from 'src/app/services/department.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-etudiant',
  templateUrl: './gestion-etudiant.component.html',
  styleUrls: ['./gestion-etudiant.component.css']
})
export class GestionEtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
   errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  constructor(
    private etudiantService: EtudiantService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
     this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.handleSearchEtudiants();
  }
   handleEditeEtudiant(etudEdit: Etudiant) {
    this.router.navigateByUrl('/etudiants/edit',{state :etudEdit});
  }

 handleChangeSize($event: Event) {
      this.size = parseInt((<HTMLInputElement>$event.target).value);
      this.handleSearchEtudiants();
    }
  handleSearchEtudiants(): void {
    this.etudiantService
      .searchEtudiants(this.searchFormGroup.value.keyword, this.page, this.size)
      .subscribe(
        (data) => {
          this.etudiants = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.number;
          this.setDisplayedPages();
        },
        (error) => {
          this.errorMessage = error;
          console.log(error);
        }
      );
  }

  handleDeleteEtudiant(etudiant: Etudiant): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.etudiantService.deleteEtudiant(etudiant.id).subscribe();
         this.etudiants = this.etudiants.filter((d) => d.id !== etudiant.id);

      }
    });
  }

  setDisplayedPages(): void {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (
      let i = startPage;
      i < startPage + 3 && i < this.totalPages;
      i++
    ) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.handleSearchEtudiants();
  }

  goToPreviousSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage;
      this.handleSearchEtudiants();
    }
  }

  goToNextSet(): void {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage;
      this.handleSearchEtudiants();
    }
  }
}
