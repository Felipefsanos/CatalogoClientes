import {Telefone} from "./telefone";
import {Endereco} from './endereco';

export class Cliente {
	id?: number;
	razaoSocial: string;
	CNPJ: number;
	nomeFantasia: string;
	inscricaoEstadual: number;
	telefones: Telefone[];
	email1: string;
	email2: string;
	endereco: Endereco;
	observacoes: string;
}
