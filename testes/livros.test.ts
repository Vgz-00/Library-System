import { Livro } from "../cadastroLivros";

describe('livros', () => {
it('Deve ser possivel adicionar um novo livro', () => {
    const livro = new Livro(1, 'Count Your Bullets', 'Java Dones', '1203444505', true, 1997);
    expect(livro.getNr()).toBe(1);
    expect(livro.estaDisponivel()).toBe(true);
    expect(livro.Infos()).toContain('Count Your Bullets');
});

it('Deve, quando for o caso, marcar o livro como emprestado', () => {
    const livro = new Livro(1, 'Count Your Bullets', 'Java Dones', '1203444505', true, 1997);
    livro.livroEmprestado();
    expect(livro.estaDisponivel()).toBe(false);

});

it('Deve, tambem quando for preciso marcar o livro como disponivel', () => {
    const livro = new Livro(1, 'Count Your Bullets', 'Java Dones', '1203444505', true, 1997);
    livro.livroDisponivel()
    expect(livro.estaDisponivel()).toBe(true);
});


});