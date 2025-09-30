import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://localhost:7188/api/usuario';

  constructor(private http: HttpClient) {}

  getUsuarioById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/buscarporid/${id}`)
      .pipe(
        tap(res => {
          console.log("Resposta get user:", res);
          return res;
        })
      );
  }
}
