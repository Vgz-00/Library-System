import promptSync from "prompt-sync";
import { Salvamento } from "./salvamentoDeDados";

const digite = promptSync();

export class Pessoa{
    constructor(
       private nome: string,
       private email: string,
       private telefone: string
    )
    {}

    getNome(): string{
      return this.nome
    }
    getEmail(): string{
        return this.email
      }
    getTelefone(): string{
        return this.telefone
      }
    Infos(): string{
        return  `Nome: ${this.nome}, Email: ${this.email}, Telefone: ${this.telefone}`;      
     }
}



export class Membro extends Pessoa{
    constructor(
      private id: number,  
      nome: string,
      email: string,
      telefone: string,
      private numeroMatricula: string
    )
    
    {  
        super(nome, email, telefone);
    }

    getNumeroMatricula(): string{
        return this.numeroMatricula
      }
    

    Infos(): string{
        return `ID: ${this.id},  ${super.Infos()}, NrMatricula: ${this.numeroMatricula}`;      
     }

} 

const salvamentoDeMembros = new Salvamento<Membro>('jsons/membros.json');
  let membros: Membro[] = salvamentoDeMembros.CarregarDados().map(
    (data: any) => new Membro( data.id, data.nome, data.email, data.telefone, data.numeroMatricula));
  


  export function menuDeMembros(): void {
    console.log('\n Biblioteca - The Books On The Table - Membros');
    console.log('1. Listar Membros Cadastrados');
    console.log('2. Adicionar Membro à Lista');
    console.log('3. Atualizar Membro');
    console.log('4. Remover Membro');
    console.log('5. Voltar ao Menu Principal');

    const opcao = digite('Escolha uma opção: ');

    switch (opcao) {
        case '1':
            listarMembros();
            break;
        case '2':
            addMembros();
            break;
        case '3':
            atualizarMembro();
            break;
        case '4':
            removerMembro();
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida.');
            menuDeMembros();
    }
}



function listarMembros(): void{
      console.log('\nListagem dos Membros')
      if ( membros.length === 0){
          console.log('Nenhum Membro Encontrado')
      } else {
          membros.forEach((membro) => console.log(membro.Infos()));
          
      }
      menuDeMembros();
      }


function addMembros(): void{
  console.log('\nAdicione um Novo Membro');
  const nome = digite('Digite um nome: ');
  const email = digite('Digite um Email: ');
  const telefone = digite('Digite um numero de telefone:')
  const numeroMatricula = digite('Digite um Numero de Matricula: ')
  
  const novoMembro = new Membro( membros.length + 1, nome, email, telefone, numeroMatricula)

  membros.push(novoMembro);
  salvamentoDeMembros.salvaDados(membros);
  console.log('Membro cadastrado no sistema!')
  menuDeMembros();

}
function atualizarMembro(): void {
  console.log('\nAtualizar Membro');
  const idMembro = parseInt(digite('Código do Membro (ID): '), 10);

  const membro = membros.find((M) => M['id'] === idMembro);
  if (!membro) {
      console.log('Erro: Membro não encontrado.');
      return menuDeMembros();
  }

  console.log(`Membro Atual: ${membro.Infos()}`);
  const nome = digite('Novo Nome (deixe vazio para manter): ').trim();
  const email = digite('Novo Email (deixe vazio para manter): ').trim();
  const telefone = digite('Novo Telefone (deixe vazio para manter): ').trim();
  const numeroMatricula = digite('Novo Número de Matrícula (deixe vazio para manter): ').trim();

  if (nome) membro['nome'] = nome;
  if (email) membro['email'] = email;
  if (telefone) membro['telefone'] = telefone;
  if (numeroMatricula) membro['numeroMatricula'] = numeroMatricula;

  salvamentoDeMembros.salvaDados(membros);
  console.log('Membro atualizado com sucesso!');
  menuDeMembros();
}

function removerMembro(): void {
  console.log('\nRemover Membro');
  const idMembro = parseInt(digite('Código do Membro (ID): '), 10);

  const indice = membros.findIndex((M) => M['id'] === idMembro);
  if (indice === -1) {
      console.log('Erro: Membro não encontrado.');
      return menuDeMembros();
  }

  membros.splice(indice, 1);
  salvamentoDeMembros.salvaDados(membros);
  console.log('Membro removido com sucesso!');
  menuDeMembros();
}
