import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarConsultaModal } from './cancelar-consulta-modal';

describe('CancelarConsultaModal', () => {
  let component: CancelarConsultaModal;
  let fixture: ComponentFixture<CancelarConsultaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarConsultaModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarConsultaModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
