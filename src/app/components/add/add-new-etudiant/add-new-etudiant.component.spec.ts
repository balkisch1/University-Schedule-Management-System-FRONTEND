import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEtudiantComponent } from './add-new-etudiant.component';

describe('AddNewEtudiantComponent', () => {
  let component: AddNewEtudiantComponent;
  let fixture: ComponentFixture<AddNewEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewEtudiantComponent]
    });
    fixture = TestBed.createComponent(AddNewEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
