import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcluirConsultaModal } from './concluir-consulta-modal';

describe('ConcluirConsultaModal', () => {
  let component: ConcluirConsultaModal;
  let fixture: ComponentFixture<ConcluirConsultaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcluirConsultaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcluirConsultaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
