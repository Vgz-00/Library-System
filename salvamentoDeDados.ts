import * as fileSystem from 'fs';

export class Salvamento<T>  {
 
   constructor(

    private pacoteDeArquivos: string   

   ){}


   salvaDados(dados: T[]): void {
 try {
   fileSystem.writeFileSync(this.pacoteDeArquivos, JSON.stringify(dados, null, 2), 'utf-8');
 } catch (erro) {
    console.error(`Erro ao salvar os dados ${this.pacoteDeArquivos}:`, erro)
 }
}

    CarregarDados(): T[] {
   try { if (!fileSystem.existsSync(this.pacoteDeArquivos)) { 
    
    return [];
   } 
    const data = fileSystem.readFileSync(this.pacoteDeArquivos, 'utf-8')
    return JSON.parse(data) as T[];
} catch (erro) {
    console.error(`Erro ao Carregar os Dados ${this.pacoteDeArquivos}:`, erro)
    return [];
}

}

}