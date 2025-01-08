import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtudiantComponent } from './gestion-etudiant.component';

describe('GestionEtudiantComponent', () => {
  let component: GestionEtudiantComponent;
  let fixture: ComponentFixture<GestionEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionEtudiantComponent]
    });
    fixture = TestBed.createComponent(GestionEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
