import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { PacienteModel } from '../models/paciente-model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private baseUrl = 'https://localhost:7188/api/paciente';

  constructor(private http: HttpClient) {}

  getPacientes() {
    return this.http.get<PacienteModel[]>(`${this.baseUrl}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }
}
