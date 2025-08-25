import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  public email: string = '';
  public senha: string = '';

  enviarUsuario() {
    console.log(this.email, this.senha);
  }
}
