import promptSync from "prompt-sync";
import { Salvamento } from './salvamentoDeDados';
import { Livro } from './cadastroLivros';
import { Membro } from './cadastroMembros';

const digite = promptSync();

export class Emprestimo {
    constructor(
        private id: number,
        public nrLivro: number,
        public nrMembro: number,
        private dataEmprestimo: Date = new Date(),
        public dataDevolucao?: Date
    ) {}

    registrarDevolucao(): void {
        this.dataDevolucao = new Date();
    }

    Infos(): string {
        return `ID: ${this.id}, Livro: ${this.nrLivro}, Membro: ${this.nrMembro}, Empréstimo: ${this.dataEmprestimo.toISOString()}, Devolução: ${this.dataDevolucao?.toISOString() ?? 'Pendente'}`;
    }
}

const salvamentoDeEmprestimos = new Salvamento<Emprestimo>('jsons/emprestimos.json');
const salvamentoDeLivros = new Salvamento<Livro>('jsons/livros.json');
const salvamentoDeMembros = new Salvamento<Membro>('jsons/membros.json');

let emprestimos: Emprestimo[] = salvamentoDeEmprestimos.CarregarDados().map(
    (data: any) =>
        new Emprestimo( data.id, data.nrLivro, data.nrMembro, new Date(data.dataEmprestimo), data.dataDevolucao ? new Date(data.dataDevolucao) : undefined));


let livros: Livro[] = salvamentoDeLivros.CarregarDados().map(
    (data: any) =>
        new Livro( data.nr, data.titulo, data.autor, data.isbn, data.disponivel, data.anoPublicacao));


let membros: Membro[] = salvamentoDeMembros.CarregarDados().map(
    (data: any) =>
        new Membro( data.id,  data.nome, data.email, data.telefone, data.numeroMatricula));

  export function menuDeEmprestimos(): void {
    console.log('\n Biblioteca - The Books On The Table - Gerenciamento de Empréstimos');
    console.log('1. Listar Empréstimos Ativos');
    console.log('2. Registrar um Empréstimo');
    console.log('3. Registrar uma Devolução');
    console.log('4. Historico de Emprestimos do Sistema')
    console.log('5. Voltar ao Menu Principal');

    const opcao = digite('Escolha uma opção: ');

    switch (opcao) {
        case '1':
            listarEmprestimos();
            break;
        case '2':
            registrarEmprestimo();
            break;
        case '3':
            registrarDevolucao();
            break;
        case '4':
            listarHistorico();
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida.');
            menuDeEmprestimos();
    }
}

function listarEmprestimos(): void {
    console.log('\nEmpréstimos Ativos:');
    emprestimos.filter((e) => !e.dataDevolucao).forEach((e) => console.log(e.Infos()));
    menuDeEmprestimos();
}

function registrarEmprestimo(): void {
    console.log('\nRegistrar Empréstimo');
    const nrLivro = parseInt(digite('Código do Livro (ID): '), 10); 
    const nrMembro = parseInt(digite('Código do Membro (ID): '), 10); 

  
    const livro = livros.find((l) => l.getNr() === nrLivro && l.estaDisponivel());
    if (!livro) {
        console.log('Erro: Livro não encontrado ou indisponível.');
        return menuDeEmprestimos();
    }

  
    const membro = membros.find((m) => m['id'] === nrMembro);
    if (!membro) {
        console.log('Erro: Membro não encontrado.');
        return menuDeEmprestimos();
    }


    const novoEmprestimo = new Emprestimo(emprestimos.length + 1, nrLivro, nrMembro);

  
    emprestimos.push(novoEmprestimo);
    livro.livroEmprestado(); 
    salvamentoDeEmprestimos.salvaDados(emprestimos);
    salvamentoDeLivros.salvaDados(livros);

    console.log('Empréstimo Registrado com Sucesso!');
    menuDeEmprestimos();
}
function registrarDevolucao(): void {
    console.log('\nRegistrar Devolução');
    const nrEmprestimo = parseInt(digite('Código do Empréstimo: '), 10);

    const emprestimo = emprestimos.find((e) => e['id'] === nrEmprestimo && !e.dataDevolucao);
    if (!emprestimo) {
        console.log('Erro: Empréstimo não encontrado.');
        return menuDeEmprestimos();
    }

    const livro = livros.find((l) => l.getNr() === emprestimo.nrLivro);
    if (livro) livro.livroDisponivel();

    emprestimo.registrarDevolucao();
    salvamentoDeEmprestimos.salvaDados(emprestimos);
    salvamentoDeLivros.salvaDados(livros);
    console.log('Devolução registrada com sucesso!');
    menuDeEmprestimos();
};
 function listarHistorico(): void{
  console.log('\nLista do Historico de Emprestimos:');

  if (emprestimos.length === 0){
    console.log('Nao ha nenhum emprestimo no sistema até o momento')
  } else {
    emprestimos.forEach((emprestimos) => {
        console.log(emprestimos.Infos());
        const situaçao = emprestimos.dataDevolucao ? 'Devolvido': 'Emprestado' ;
        console.log(`situaçao ${situaçao}`);
    });
  };
  menuDeEmprestimos();
 };