// arquivo responsável pela modelagem de dados para Curriculos
export class Curriculo {

    // atributos
    constructor(
        private _id: number,
        private _nome: string,
        private _idade: number,
        private _telefone: string, // Tipo STRING - Correto para telefone
        private _email: string,    // Tipo STRING - Correto para email
        private _descricao: string,
    ) {}

    // Criar os métodos de acesso públicos (getters e setters)

    // Getter e Setter para 'id'
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v; // CORRIGIDO: Atribui a _id, não a _idade
    }

    // Getter e Setter para 'nome'
    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }

    // Getter e Setter para 'idade'
    public get idade(): number {
        return this._idade;
    }
    public set idade(v: number) {
        this._idade = v;
    }

    // Getter e Setter para 'telefone'
    public get telefone(): string { // CORRIGIDO: Tipo de retorno STRING
        return this._telefone;
    }
    public set telefone(value: string) { // CORRIGIDO: Tipo de valor STRING
        this._telefone = value;
    }

    // Getter e Setter para 'email'
    public get email(): string { // CORRIGIDO: Tipo de retorno STRING (mais específico que any)
        return this._email;
    }
    public set email(value: string) { // CORRIGIDO: Tipo de valor STRING (mais específico que any)
        this._email = value;
    }

    // Getter e Setter para 'descricao'
    public get descricao(): string {
        return this._descricao;
    }
    public set descricao(value: string) {
        this._descricao = value;
    }

    // métodos de conversão de objetos

    public toMap(): { [key: string]: any } {
        return {
            id: this._id,
            nome: this._nome,
            idade: this._idade,
            telefone: this._telefone,
            email: this._email,
            descricao: this._descricao
        };
    }

    static fromMap(map: any): Curriculo {
        return new Curriculo(
            map.id,
            map.nome,
            map.idade,
            // Garante que telefone e email sejam string ao criar a instância
            map.telefone ? String(map.telefone) : '', // Conversão segura para string
            map.email ? String(map.email) : '',       // Conversão segura para string
            map.descricao
        );
    }
}