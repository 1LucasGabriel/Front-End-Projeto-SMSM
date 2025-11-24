import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteModel } from '../models/paciente-model';
import { tap } from 'rxjs';
import { ProcedimentoModel } from '../models/procedimento-model';
import { DemandaModel, DemandaPorEspecialidadeModel } from '../models/demanda-model';
import { UsuarioModel } from '../models/usuario-model';
import { UnidadeModel } from '../models/unidade-model';
import { VagaComUnidadeModel } from '../models/vaga-model';
import { AgendamentoCompostoModel, AgendamentoFilaModel, AgendamentoModel } from '../models/agendamento-model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  private baseUrl = 'https://localhost:7188/api/paciente';
  private baseUrlProcedimento = 'https://localhost:7188/api/procedimento';
  private baseUrlDemanda = 'https://localhost:7188/api/demanda';
  private baseUrlUsuario = 'https://localhost:7188/api/usuario';
  private baseUrlUnidade = 'https://localhost:7188/api/unidadesaude';
  private baseUrlVaga = 'https://localhost:7188/api/vaga';
  private baseUrlAgendamento = 'https://localhost:7188/api/agendamento';


  public getPacientes() {
    return this.http.get<PacienteModel[]>(`${this.baseUrl}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getProcedimentos() {
    return this.http.get<ProcedimentoModel[]>(`${this.baseUrlProcedimento}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public postDemanda(demanda: DemandaModel) {
    return this.http.post<any>(`${this.baseUrlDemanda}/cadastrar`, demanda)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getUsuarioById(id: number) {
    return this.http.get<UsuarioModel>(`${this.baseUrlUsuario}/buscarporid/${id}`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getUnidades() {
    return this.http.get<UnidadeModel[]>(`${this.baseUrlUnidade}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getDemandas() {
    return this.http.get<DemandaModel[]>(`${this.baseUrlDemanda}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getPacienteById(id: number) {
    return this.http.get<PacienteModel>(`${this.baseUrl}/buscarporid/${id}`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getVagaComUnidade() {
    return this.http.get<VagaComUnidadeModel[]>(`${this.baseUrlVaga}/unidades`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public postAgendamento(agendamento: AgendamentoModel) {
    return this.http.post<any>(`${this.baseUrlAgendamento}/cadastrar`, agendamento)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getAgendamentoComposto() {
    return this.http.get<AgendamentoCompostoModel[]>(`${this.baseUrlAgendamento}/buscarcomposto`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getAgendamento() {
    return this.http.get<AgendamentoModel[]>(`${this.baseUrlAgendamento}/buscar`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getDemandaPorEspecialidade() {
    return this.http.get<DemandaPorEspecialidadeModel[]>(`${this.baseUrlDemanda}/demanda-especialidade`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getUnidadeById(id: number) {
    return this.http.get<UnidadeModel>(`${this.baseUrlUnidade}/buscarporid/${id}`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public putAgendamento(id: number, agendamento: AgendamentoModel) {
    return this.http.put<any>(`${this.baseUrlAgendamento}/atualizar${id}`, agendamento)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public getAgendamentoFila(id: number) {
    return this.http.get<AgendamentoFilaModel[]>(`${this.baseUrlAgendamento}/fila/posicao/${id}`)
      .pipe(
        tap(res => {
          return res;
        })
      );
  }

  public irPara(rota: string[]) {
    this.router.navigate(rota);
  }

  public buscarData(cidade: string) {
    const agora = new Date();
    const dia = agora.getDate();
    const mes = agora.toLocaleString("pt-BR", { month: "long" });
    const ano = agora.getFullYear();

    return `${cidade}, ${dia} de ${mes} de ${ano}`;
  }

  public buscarNomeUsuario() {
    return localStorage.getItem('user');
  }

  public buscarIdUsuario() {
    return localStorage.getItem('id');
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }

}