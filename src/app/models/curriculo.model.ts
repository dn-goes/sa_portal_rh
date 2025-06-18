// arquivo responsável pela modelagem de dados para Curriculos
export class Curriculo {
  constructor(
    public id: number,
    public nome: string,
    public idade: number,
    public telefone: string,
    public email: string,
    public descricao: string
  ) {}

  // Converte objeto Curriculo para um objeto genérico (usado no json-server)
  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      idade: this.idade,
      telefone: this.telefone,
      email: this.email,
      descricao: this.descricao
    };
  }

  // Converte objeto JSON (vindo da API) para instância de Curriculo
  static fromMap(map: any): Curriculo {
    return new Curriculo(
      map.id ?? 0,
      map.nome ?? '',
      map.idade ?? 0,
      String(map.telefone ?? ''),
      String(map.email ?? ''),
      map.descricao ?? ''
    );
  }
}
