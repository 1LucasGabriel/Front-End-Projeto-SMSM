import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public tipoUsuario: 'funcionario' | 'paciente' = 'funcionario';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  public login() {
    if (!this.cpf || !this.senha) {
      this.snackBar.open('Preencha CPF e senha', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const request =
      this.tipoUsuario === 'funcionario'
        ? this.authService.loginFuncionario(this.cpf, this.senha)
        : this.authService.loginPaciente(this.cpf, this.senha);

    request.subscribe({
      next: res => {
        this.router.navigate(['/home']);
      },
      error: err => {
        this.snackBar.open('CPF ou senha incorretos', 'Fechar', {
          duration: 3500,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
