export interface DemandaModel {
    id?: number,
    idPaciente: number,
    pacienteNome: string,
    idProcedimento: number,
    procedimentoNome: string,
    idUnidadeSolicitante: number,
    idUsuarioSolicitante: number,
    dataSolicitacao: Date | string,
    prioridade: string,
    status: string,
    justificativa: string
}

export interface DemandaPorEspecialidadeModel {
    label: string, 
    value: number
}