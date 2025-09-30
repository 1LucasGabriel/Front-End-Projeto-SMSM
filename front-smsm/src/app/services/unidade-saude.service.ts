import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadeSaudeService {
  private baseUrl = 'https://localhost:7188/api/unidadesaude';

  constructor(private http: HttpClient) {}

  getUnidadeById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/buscarporid/${id}`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }
}
