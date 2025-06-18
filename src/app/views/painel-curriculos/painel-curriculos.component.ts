import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-painel-Curriculos',
  templateUrl: './painel-Curriculos.component.html',
  styleUrls: ['./painel-Curriculos.component.scss']
})
export class PainelCurriculosComponent implements OnInit {

  // Atributos (Declaração e inicialização correta)
  public curriculo: Curriculo = new Curriculo(0, "", 0, "", "", ""); // limpa o formulário
  public curriculos: Curriculo[] = [];

  constructor(private _curriculosService: CurriculosService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  // READ - Listar todos os currículos
  listarCurriculos(): void {
    this._curriculosService.getCurriculos().subscribe(
      (e) => {
        this.curriculos = e.map(
          (curriculo) => Curriculo.fromMap(curriculo)
        );
      },
      (error) => {
        console.error("Erro ao Listar Curriculos: ", error);
      }
    );
  }

  // READ - Listar um currículo por ID (edição)
  listarCurriculoPorId(curriculo: Curriculo): void {
    this.curriculo = curriculo;
  }

  // CREATE - Cadastrar currículo
  cadastrarCurriculo(): void {
    this._curriculosService.postCurriculo(this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, "", 0, "", "", ""); // limpa o formulário
        this.listarCurriculos(); // atualiza a lista
      },
      (error) => {
        console.error("Erro ao Cadastrar Curriculo: ", error);
      }
    );
  }

  // UPDATE - Atualizar currículo
  atualizarCurriculo(id: any): void {
    this._curriculosService.putCurriculo(id, this.curriculo).subscribe(
      () => {
        this.curriculo = new Curriculo(0, "", 0, "", "", ""); // limpa o formulário
        this.listarCurriculos(); // atualiza a lista
      },
      (error) => {
        console.error('Erro ao Atualizar Curriculo: ', error);
      }
    );
  }

  // DELETE - Excluir currículo
  excluirCurriculo(id: any): void {
    this._curriculosService.deleteCurriculo(id).subscribe(
      () => {
        this.curriculo = new Curriculo(0, "", 0, "", "", ""); // limpa o formulário
        this.listarCurriculos(); // atualiza a lista
      },
      (error) => {
        console.error('Erro ao Deletar Curriculo: ', error);
      }
    );
  }
}