import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamarPacienteModal } from './chamar-paciente-modal';

describe('ChamarPacienteModal', () => {
  let component: ChamarPacienteModal;
  let fixture: ComponentFixture<ChamarPacienteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamarPacienteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamarPacienteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
