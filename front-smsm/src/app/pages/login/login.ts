import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  public usuario: string = '';
  public senha: string = '';

  constructor(
    private router: Router
  ) {}

  public botao() {
    this.enviarUsuario();
    this.irParaHome();
  }

  public enviarUsuario() {
    console.log(this.usuario, this.senha);
  }

  public irParaHome() {
    this.router.navigate(['/home']);
  }
}
