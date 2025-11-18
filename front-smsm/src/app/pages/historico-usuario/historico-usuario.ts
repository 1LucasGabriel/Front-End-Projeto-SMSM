import { Component } from '@angular/core';
import { GenericService } from '../../services/generic-service';
import { UsuarioModel } from '../../models/usuario-model';
import { DemandaModel } from '../../models/demanda-model';

@Component({
  selector: 'app-historico-usuario',
  imports: [],
  templateUrl: './historico-usuario.html',
  styleUrl: './historico-usuario.scss'
})
export class HistoricoUsuario {
  public usuario: UsuarioModel = {
    id: 0,
    nome: '',
    cpf: '',
    senha: '',
    idUnidadeSaude: 0,
    idPerfil: 0
  }
  public demandas: DemandaModel[] = [];

  constructor(
    private genericService: GenericService
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.buscarDemandasUsuario();
  }

  public buscarUsuarioLogado() {
    this.genericService.getUsuarioById(Number(this.genericService.buscarIdUsuario()))
      .subscribe((value) => {
        this.usuario = value;
      });
  }

  public buscarDemandasUsuario() {
    this.genericService.getDemandas().subscribe((value) => {
      value.forEach(element => {
        if (element.idPaciente == this.usuario.id) {
          this.demandas.push(element);
        }
      });
    });
  }

  public irPara(rota: string[]) {
    this.genericService.irPara(rota);
  }

  public sair() {
    this.genericService.logout();
  }
}
