import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaPaciente } from './fila-paciente';

describe('FilaPaciente', () => {
  let component: FilaPaciente;
  let fixture: ComponentFixture<FilaPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilaPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
