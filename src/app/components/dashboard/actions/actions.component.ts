import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';
import { ClasseService } from 'src/app/services/classe.service';
import { EmploiDeTempsService } from 'src/app/services/emploi-de-temps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  spinnerGenerate: boolean = false;
  spinnerImport: boolean = false;
  spinnerExport: boolean = false;
  importStatus: boolean = false;
  generateStatus: boolean = false;

  constructor(
    private actons: ActionsService,
    private cl: ClasseService,
    private el: EmploiDeTempsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkImportStatus();
    this.checkGenerateStatus();
  }

  checkImportStatus(): void {
    this.cl.getClasses(0, 6).subscribe(
      (data) => {
        if (data.numberOfElements > 0) {
          this.importStatus = true;
        }
      },
      (error) => console.error('Erreur lors de la récupération des classes :', error)
    );
  }

  checkGenerateStatus(): void {
    this.el.getEmplois().subscribe(
      (data) => {
        if (data.length > 0 && data[0].jour) {
          this.generateStatus = true;
        }
      },
      (error) => console.error('Erreur lors de la récupération des emplois de temps :', error)
    );
  }

  handleImport(event: any): void {
    const file = event.target.files?.[0];
    if (!file) {
      Swal.fire('Erreur', 'Aucun fichier sélectionné.', 'error');
      return;
    }
    this.spinnerImport = true;
    this.importFile(file);
  }

  importFile(file: File): void {
    this.actons.importFile(file).subscribe(
      (data) => {
        this.spinnerImport = false;
        this.importStatus = true;
        Swal.fire('Importé !', 'Le fichier a été importé avec succès.', 'success');
        this.router.navigate(['/home'], { skipLocationChange: true });
      },
      (error) => {
        this.spinnerImport = false;
        console.error('Erreur lors de l\'importation :', error);
        Swal.fire('Erreur !', 'Une erreur est survenue lors de l\'importation.', 'error');
      }
    );
  }

  handleExport(): void {
    Swal.fire({
      title: 'Voulez-vous vraiment exporter les données ?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, exporter !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerExport = true;
        this.exportFile();
      }
    });
  }

  exportFile(): void {
    this.actons.exportFile().subscribe(
      (data: Blob) => {
        this.spinnerExport = false;
        this.downloadFile(data, 'application/pdf', 'exported_file.pdf');
      },
      (error) => {
        this.spinnerExport = false;
        console.error('Erreur lors de l\'exportation :', error);
        Swal.fire('Erreur !', 'Une erreur est survenue lors de l\'exportation.', 'error');
      }
    );
  }

  handleGenerate(): void {
    Swal.fire({
      title: 'Voulez-vous vraiment générer les emplois de temps ?',
      text: 'Cette opération peut prendre du temps',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, générer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerGenerate = true;
        this.generateEmploi();
      }
    });
  }

  generateEmploi(): void {
    this.actons.generateEmploi().subscribe(
      (data) => {
        this.spinnerGenerate = false;
        this.generateStatus = true;
        Swal.fire('Généré !', 'Les emplois de temps ont été générés avec succès.', 'success');
      },
      (error) => {
        this.spinnerGenerate = false;
        console.error('Erreur lors de la génération :', error);
        Swal.fire('Erreur !', 'Une erreur est survenue lors de la génération.', 'error');
      }
    );
  }

  downloadFile(data: Blob, fileType: string, fileName: string): void {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
