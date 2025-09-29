import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl = 'https://localhost:7188';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(cpf: string, senha: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { cpf, senha })
      .pipe(
        tap(res => {
          if (res?.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
