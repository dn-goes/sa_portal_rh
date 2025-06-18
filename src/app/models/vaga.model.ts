// arquivo responsável pela modelagem de dados para vagas
export class Vaga {

  // atributos e construtor simplificados
  constructor(
    public id: number,
    public nome: string,
    public foto: string,
    public descricao: string,
    public salario: number
  ) {}

  // métodos de conversão de objetos

  public toMap(): { [key: string]: any } {
    return {
      id: this.id,
      nome: this.nome,
      foto: this.foto,
      descricao: this.descricao,
      salario: this.salario
    };
  }

  static fromMap(map: any): Vaga {
    return new Vaga(
      map.id ?? 0,
      map.nome ?? '',
      map.foto ?? '',
      map.descricao ?? '',
      map.salario ?? 0
    );
  }
}
