interface ClasseResponse {
  classeName: string;
}
import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ElementDeModule } from 'src/app/models/elementModule.models';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  classeId: number | undefined = undefined;
  emploi: ElementDeModule[] = [];

  errorMessage: string | undefined = undefined;



  enseignantId: any;
  jours: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  periodes: string[] = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
  loading: boolean = true;

  // Dictionnaire pour traduire les jours en français
  daysTranslation: { [key: string]: string } = {
    MONDAY: 'Lundi',
    TUESDAY: 'Mardi',
    WEDNESDAY: 'Mercredi',
    THURSDAY: 'Jeudi',
    FRIDAY: 'Vendredi'
  };

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loadClasseAndEmploi(1); // Utilisation d'un ID d'exemple, remplacez-le par l'ID réel de l'étudiant
  }

  loadClasseAndEmploi(id: number): void {
    this.loading = true;
    this.errorMessage = undefined;

    // Étape 1: Récupérer la classe de l'étudiant par son ID
    this.etudiantService.getClasseOfEtudiant(id.toString()).subscribe(
      (response: string) => {
        console.log('Classe récupérée:', response);
    
        // Étape 2: Récupérer l'ID de la classe par son nom
        this.etudiantService.getClasseIdByName(response).subscribe(
          (classeId) => {
            this.classeId = classeId;
            console.log('ID de la classe récupéré:', this.classeId);
    
            // Étape 3: Récupérer l'emploi du temps de la classe
            this.etudiantService.getEmploisByClasse(this.classeId).subscribe(
              (emploiData) => {
                console.log('Emploi du temps récupéré:', emploiData);
                this.emploi = emploiData;
                this.loading = false;
              },
              (error) => {
                console.error('Erreur lors de la récupération de l\'emploi du temps:', error);
                this.errorMessage = 'Erreur lors de la récupération de l\'emploi du temps.';
                this.loading = false;
              }
            );
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'ID de la classe:', error);
            this.errorMessage = 'Erreur lors de la récupération de l\'ID de la classe.';
            this.loading = false;
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération de la classe de l\'étudiant:', error);
        this.errorMessage = 'Erreur lors de la récupération de la classe de l\'étudiant.';
        this.loading = false;
      }
    );
  }
  // Vérifier si un jour contient des modules
  hasModulesForDay(jour: string): boolean {
    return this.emploi.some(item => item.jour === jour);
  }

  // Convertir le jour en français
  getFrenchDay(jour: string): string {
    return this.daysTranslation[jour] || jour;
  }

  hasModuleForDayAndPeriode(jour: string, periode: string): boolean {
      return this.emploi.some(item => item.jour === jour && item.periode === periode);
    }
    downloadPDF(): void {
      const doc = new jsPDF();
      const margin = 10;
      const tableWidth = 190; // Largeur totale du tableau
      const columnWidth = tableWidth / 7; // Chaque colonne aura une largeur égale
      let yPosition = margin + 20; // Position de départ
    
      // Ajouter un titre plus grand
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
      doc.text('Emploi du Temps de l\'Enseignant', margin, yPosition);
      yPosition += 20;
    
      // Définir les en-têtes du tableau
      const headers = ['Jours', 'S1 (8:30 - 10:00)', 'S2 (10:05 - 11:35)', 'S3 (11:40 - 13:10)', 'S4 (13:15 - 14:45)', 'S5 (14:50 - 16:20)', 'S6 (16:25 - 17:55)'];
    
      // Style des en-têtes
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255); // Couleur du texte des en-têtes (blanc)
      doc.setFillColor(0, 123, 255); // Couleur de fond des en-têtes (bleu)
      
      // Dessiner l'en-tête avec un fond coloré
      doc.rect(margin, yPosition, tableWidth, 10, 'F'); // Fond bleu
      headers.forEach((header, index) => {
        doc.text(header, margin + (index * columnWidth) + columnWidth / 2, yPosition + 6, { align: 'center' });
      });
    
      yPosition += 10;
    
      // Dessiner les lignes de données avec un fond alterné pour la lisibilité
      let alternateColor = false;
      this.jours.forEach(jour => {
        const rowColor = alternateColor ? [240, 240, 240] : [255, 255, 255]; // Fond alterné
    
        // Dessiner une ligne de fond pour chaque jour
        doc.setFillColor(rowColor[0], rowColor[1], rowColor[2]); // Utilisation directe des valeurs du tableau
        doc.rect(margin, yPosition, tableWidth, 10, 'F');
        doc.setTextColor(0, 0, 0); // Couleur du texte (noir)
    
        // Ajouter le jour à la première colonne
        doc.text(jour, margin + 5, yPosition + 6);
    
        // Ajouter les périodes (colonnes)
        this.periodes.forEach((periode, index) => {
          const item = this.emploi.find(item => item.jour === jour && item.periode === periode);
          const moduleText = item ? `${item.libelle} - Salle: ${item.salle?.numSalle}` : '';
          doc.text(moduleText, margin + (index + 1) * columnWidth + columnWidth / 2, yPosition + 6, { align: 'center' });
        });
    
        yPosition += 10;
        alternateColor = !alternateColor; // Alterner la couleur de fond
      });
    
      // Ajouter une bordure autour du tableau
      doc.setDrawColor(0, 0, 0); // Couleur de la bordure (noir)
      doc.rect(margin, margin + 10, tableWidth, yPosition - margin - 10); // Bordure
    
      // Télécharger le PDF
      doc.save('emploi_du_temps.pdf');
    }
    
  
}