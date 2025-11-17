export interface VagaModel {
    id: number,
    idProcedimento: number,
    idUnidadeOfertante: number,
    quantidade: number,
    mesAnoReferencia: string
}

export interface VagaComUnidadeModel {
    unidadeNome: string,
    tipo: string,
    regiao: string,
    quantidadeVagas: number,
    mesAnoReferencia: string,
    id: number
}