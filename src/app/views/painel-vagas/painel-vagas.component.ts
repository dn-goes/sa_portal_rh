import { Component, OnInit } from '@angular/core';
import { Vaga } from 'src/app/models/vaga.model';
import { VagasService } from 'src/app/services/vagas.service';

@Component({
  selector: 'app-painel-vagas',
  templateUrl: './painel-vagas.component.html',
  styleUrls: ['./painel-vagas.component.scss']


})
export class PainelVagasComponent implements OnInit {
  // Instância para o formulário de cadastro/edição
  public vaga: Vaga = new Vaga(0, "", "", "", 0);

  // Lista de todas as vagas exibidas na tabela
  public vagas: Vaga[] = [];

  constructor(private _vagasService: VagasService) {}

  ngOnInit(): void {
    this.listarVagas();
  }

  // --- MÉTODOS CRUD ---

  listarVagas(): void {
    this._vagasService.getVagas().subscribe({
      next: (res) => {
        // O `fromMap` garante que os objetos têm os métodos e propriedades da classe Vaga
        this.vagas = res.map(v => Vaga.fromMap(v));
      },
      error: (err) => {
        console.error("Erro ao listar vagas:", err);
        alert("Não foi possível carregar as vagas. Verifique o console.");
      }
    });
  }

  /**
   * Gerencia o envio do formulário.
   * Se a vaga tiver um ID, atualiza; senão, cadastra.
   */
  onSubmit(): void {
    if (!this.vaga.nome || this.vaga.nome.trim() === '') {
      alert("O nome da vaga é obrigatório.");
      return;
    }

    // Garante que o salário é um número
    this.vaga.salario = Number(this.vaga.salario);

    if (this.vaga.id > 0) {
      this.atualizarVaga();
    } else {
      this.cadastrarVaga();
    }
  }

  private cadastrarVaga(): void {
    this._vagasService.postVaga(this.vaga).subscribe({
      next: () => {
        alert('Vaga cadastrada com sucesso!');
        this.resetarFormulario();
        this.listarVagas(); // Atualiza a lista
      },
      error: (err) => {
        console.error("Erro ao cadastrar vaga:", err);
        alert("Ocorreu um erro ao cadastrar a vaga.");
      }
    });
  }

  private atualizarVaga(): void {
    this._vagasService.putVaga(this.vaga.id, this.vaga).subscribe({
      next: () => {
        alert('Vaga atualizada com sucesso!');
        this.resetarFormulario();
        this.listarVagas(); // Atualiza a lista
      },
      error: (err) => {
        console.error("Erro ao atualizar vaga:", err);
        alert("Ocorreu um erro ao atualizar a vaga.");
      }
    });
  }

  excluirVaga(id: number): void {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      this._vagasService.deleteVaga(id).subscribe({
        next: () => {
          alert('Vaga excluída com sucesso!');
          // Se a vaga excluída era a que estava no formulário, limpa o formulário
          if (this.vaga.id === id) {
              this.resetarFormulario();
          }
          this.listarVagas(); // Atualiza a lista
        },
        error: (err) => {
          console.error("Erro ao excluir vaga:", err);
          alert("Ocorreu um erro ao excluir a vaga.");
        }
      });
    }
  }

  /**
   * Preenche o formulário com os dados de uma vaga para edição.
   * Cria uma cópia do objeto para evitar alteração direta na tabela.
   */
  editarVaga(vaga: Vaga): void {
    this.vaga = new Vaga(vaga.id, vaga.nome, vaga.foto, vaga.descricao, vaga.salario);
  }

  /**
   * Limpa o formulário, preparando-o para um novo cadastro.
   */
  resetarFormulario(): void {
    this.vaga = new Vaga(0, "", "", "", 0);
  }
}
