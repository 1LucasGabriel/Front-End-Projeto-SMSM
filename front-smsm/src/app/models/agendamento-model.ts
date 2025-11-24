export interface AgendamentoModel {
    id: number,
    idDemanda: number,
    idVaga: number,
    idUsuarioRegulador: number,
    dataAgendamento: Date | string,
    dataRealizacao: Date | string,
    statusComparecimento: string
}

export interface AgendamentoCompostoModel {
    id: number,
    idDemanda: number,
    idVaga: number,
    idUsuarioRegulador: number,
    dataAgendamento: Date | string,
    dataRealizacao: Date | string,
    statusComparecimento: string,
    pacienteNome: string,
    procedimentoNome: string,
    medicoNome: string,
    justificativa: string
}

export interface AgendamentoFilaModel {
    idPaciente: number,
    pacienteNome: string,
    procedimentoNome: string,
    justificativa: string,
    medicoNome: string,
    posicao: number,
    totalNaFila: number
}