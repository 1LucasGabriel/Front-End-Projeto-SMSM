import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  public cpf: string = '';
  public senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login() {
    this.authService.login(this.cpf, this.senha).subscribe({
      next: res => {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: err => {
        alert('CPF ou senha incorretos');
      }
    });
  }
}
