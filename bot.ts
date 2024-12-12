import promptSync  from 'prompt-sync';
import { menuDeLivros } from './cadastroLivros';
import { menuDeMembros} from './cadastroMembros';
import { menuDeEmprestimos } from './gerenEmprestimos';

const digite = promptSync();

function menu(): void{
    console.log('\n Biblioteca - The Books On The Table')
    console.log('1. Cadastros De Livros')
    console.log('2. Cadastros De Membros')
    console.log('3. Gerenciar Emprestimos')
    console.log('4. Sair Do Sitema')

   const opçoes = digite('Escolha uma opçao ai: ');


        switch (opçoes) {
            
            
            case '1':
                menuDeLivros();
            break;
                
            
            case '2':
                menuDeMembros();
            break;
                    
            
            case '3':
                menuDeEmprestimos();
            break;
            
            
            case '4':
                console.log('Saindo Do Sistema...');
                return
               
                default:
                console.log('Esta Opçao Nao é valida nesse Sistema');
            
                break;
        };
    menu();
    }



menu();







