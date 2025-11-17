import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7188';
  private tokenKey = 'auth_token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { cpf, senha })
      .pipe(
        tap(res => {
          console.log("Resposta login:", res);

          if (res?.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }

          if (res?.nome) {
            localStorage.setItem(this.userKey, res.nome);
          }

          if (res?.userId) {
            localStorage.setItem('id', res.userId);
          }

          if (res?.perfil) {
            localStorage.setItem('perfil', res.perfil);
          }
        })
      );
  }

  logout() {
    this.removeItem(this.tokenKey);
    this.removeItem(this.userKey);
  }

  getToken(): string | null {
    return this.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getUserName(): string | null {
    return this.getItem(this.userKey);
  }

  private setItem(key: string, value: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  }

  private getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private removeItem(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }

    getUsuarioById(id: number) {
    return this.http.get<any>(`https://localhost:7188/api/usuario/buscarporid/${id}`)
      .pipe(
        tap(res => {
          console.log("Resposta get user:", res);
          return res;
        })
      );
  }
}
