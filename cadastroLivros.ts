import promptSync from "prompt-sync";
import { Salvamento } from "./salvamentoDeDados";

const digite = promptSync();


export class Livro {
    constructor(
        private nr: number,
        private titulo: string,
        private autor: string,
        private isbn: string,
        private disponivel: boolean = true,
        public anoPublicacao: number = 0
    ) {}

    getNr(): number {
        return this.nr;
    }

    
    estaDisponivel(): boolean {
        return this.disponivel;
    }
    
    livroDisponivel(): void {
        this.disponivel = true;
    }
    
    livroEmprestado(): void {
        this.disponivel = false;
    }

    Infos(): string {
        return `Nr: ${this.nr}, Titulo: ${this.titulo}, Autor: ${this.autor}, ISBN: ${this.isbn}, Ano De Publicação: ${this.anoPublicacao}, Disponível: ${this.disponivel ? 'Sim' : 'Não'}`;
    }
}


const salvamentoDeLivros = new Salvamento<Livro>('jsons/livros.json');
let livros: Livro[] = salvamentoDeLivros.CarregarDados()
    .filter((data: any) => {
        return ( typeof data.nr === 'number' &&
            typeof data.titulo === 'string' && data.titulo.trim() !== '' &&
            typeof data.autor === 'string' && data.autor.trim() !== '' &&
            typeof data.isbn === 'string' && data.isbn.trim() !== '' &&
            typeof data.disponivel === 'boolean' &&
            typeof data.anoPublicacao === 'number'
               );
    
    
            })
            .map(
            (data: any) => new Livro( data.nr, data.titulo, data.autor, data.isbn, data.disponivel, data.anoPublicacao)
    );
    

export function menuDeLivros(): void {
    console.log('\n Biblioteca - The Books On The Table - Livros');
    console.log('1. Listar Livros');
    console.log('2. Adicionar Livro à Lista');
    console.log('3. Atualizar Livro');
    console.log('4. Remover Livro');
    console.log('5. Voltar ao Menu Principal');

    const opcao = digite('Escolha uma opção: ');

    switch (opcao) {
        case '1':
            listarLivros();
            break;
        case '2':
            adicionarLivro();
            break;
        case '3':
            atualizarLivro();
            break;
        case '4':
            removerLivro();
            break;
        case '5':
            return; 
        default:
            console.log('Opção inválida.');
            menuDeLivros();
    }
}


function listarLivros(): void {
    console.log('\nListagem de Livros:');
    if (livros.length === 0) {
        console.log('Nenhum Livro Foi Encontrado.');
    } else {
        livros.forEach((livro: Livro) => console.log(livro.Infos()));
    }
    menuDeLivros();
}

function adicionarLivro(): void {
    console.log('\nAdicione um Livro');
    const titulo = digite('Título do Livro: ');
    const autor = digite('Autor do Livro: ');
    const isbn = digite('ISBN do Livro: ');
    const anoPublicacao = parseInt(digite('Ano de Publicação do Livro: '), 10);

    const novoLivro = new Livro( livros.length + 1, titulo, autor, isbn, true, anoPublicacao);

    livros.push(novoLivro);
    salvamentoDeLivros.salvaDados(livros);
    console.log('Livro cadastrado com sucesso!');
    menuDeLivros(); 
}
function atualizarLivro(): void {
    console.log('\nAtualizar Livro');
    const nrLivro = parseInt(digite('Código do Livro (ID): '), 10);

    const livro = livros.find((l) => l.getNr() === nrLivro);
    if (!livro) {
        console.log('Erro: Livro não encontrado.');
        return menuDeLivros();
    }

    console.log(`Livro Atual: ${livro.Infos()}`);
    const titulo = digite('Novo Título (deixe vazio para manter): ').trim();
    const autor = digite('Novo Autor (deixe vazio para manter): ').trim();
    const isbn = digite('Novo ISBN (deixe vazio para manter): ').trim();
    const anoPublicacaoStr = digite('Novo Ano de Publicação (deixe vazio para manter): ').trim();

    if (titulo) livro['titulo'] = titulo;
    if (autor) livro['autor'] = autor;
    if (isbn) livro['isbn'] = isbn;
    if (anoPublicacaoStr) livro['anoPublicacao'] = parseInt(anoPublicacaoStr, 10);

    salvamentoDeLivros.salvaDados(livros);
    console.log('Livro atualizado com sucesso!');
    menuDeLivros();
}

function removerLivro(): void {
    console.log('\nRemover Livro');
    const nrLivro = parseInt(digite('Código do Livro (ID): '), 10);

    const indice = livros.findIndex((L) => L.getNr() === nrLivro);
    if (indice === -1) {
        console.log('Erro: Livro não encontrado.');
        return menuDeLivros();
    }

    livros.splice(indice, 1);
    salvamentoDeLivros.salvaDados(livros);
    console.log('Livro removido com sucesso!');
    menuDeLivros();
}
