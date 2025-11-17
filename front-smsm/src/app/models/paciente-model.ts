export interface PacienteModel {
    id: number,
    nome: string,
    cpf: string,
    cns: string,
    dataNascimento: Date | string,
    endereco: string
}