import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoUsuario } from './historico-usuario';

describe('HistoricoUsuario', () => {
  let component: HistoricoUsuario;
  let fixture: ComponentFixture<HistoricoUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
