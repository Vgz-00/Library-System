import { Emprestimo } from "../gerenEmprestimos";


describe('Testes dedicados a parte de Emprestimos',() => {

it('registro de novo emprestimo', () => {
const emprestimo = new Emprestimo(1,1,1, new Date('2024-08-20'));
expect(emprestimo['id']).toBe(1);
expect(emprestimo.nrLivro).toBe(1)
expect(emprestimo.nrMembro).toBe(1)
});

it('registro de devoluçao de um livro', () => {
    const emprestimo = new Emprestimo(1,1,1, new Date('2024-08-20'));
    emprestimo.registrarDevolucao();
    expect(emprestimo.dataDevolucao).toBeDefined();
    });
    

});