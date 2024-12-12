import { Membro } from "../cadastroMembros";

describe('Membros', () => {
    it('Deve ser possivel adicionar um novo membro a lista', () =>{
        const membro = new Membro(1,'fernandinho alfazir', 'alfhadinho@gmail.com','991223455','2007012540');
        expect(membro['id']).toBe(1);
        expect(membro.getNome()).toBe('fernandinho alfazir');
        expect(membro.getNumeroMatricula()).toBe('2007012540');
    })
    
    it('Deve retornar as informaçoes do membro', () =>{
        const membro = new Membro(1,'fernandinho alfazir', 'alfhadinho@gmail.com','991223455','2007012540');
        const infos = membro.Infos();
        expect(infos).toContain('fernandinho alfazir')
        expect(infos).toContain('2007012540')
    })
})