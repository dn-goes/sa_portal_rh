import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-painel-curriculos',
  templateUrl: './painel-curriculos.component.html',
  styleUrls: ['./painel-curriculos.component.scss'],
})
export class PainelCurriculosComponent implements OnInit {
listarCurriculoPorId(_t109: Curriculo) {
throw new Error('Method not implemented.');
}
resetarFormularioCurriculo() {
throw new Error('Method not implemented.');
}
salvarCurriculo() {
throw new Error('Method not implemented.');
}
  public curriculo: Curriculo = new Curriculo(0, '', 0, '', '', '');
  public curriculos: Curriculo[] = [];

  constructor(private curriculosService: CurriculosService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos(): void {
    this.curriculosService.getCurriculos().subscribe({
      next: (res) => {
        this.curriculos = res.map((c) => Curriculo.fromMap(c));
      },
      error: (err) => {
        console.error('Erro ao listar currículos:', err);
        alert('Não foi possível carregar os currículos.');
      },
    });
  }

  onSubmit(): void {
    if (!this.curriculo.nome || this.curriculo.nome.trim() === '') {
      alert('O nome do currículo é obrigatório.');
      return;
    }

    if (this.curriculo.id > 0) {
      this.atualizarCurriculo();
    } else {
      this.cadastrarCurriculo();
    }
  }

  private cadastrarCurriculo(): void {
    this.curriculosService.postCurriculo(this.curriculo).subscribe({
      next: () => {
        alert('Currículo cadastrado com sucesso!');
        this.resetarFormulario();
        this.listarCurriculos();
      },
      error: (err) => {
        console.error('Erro ao cadastrar currículo:', err);
        alert('Erro ao cadastrar currículo.');
      },
    });
  }

  private atualizarCurriculo(): void {
    this.curriculosService
      .putCurriculo(this.curriculo.id, this.curriculo)
      .subscribe({
        next: () => {
          alert('Currículo atualizado com sucesso!');
          this.resetarFormulario();
          this.listarCurriculos();
        },
        error: (err) => {
          console.error('Erro ao atualizar currículo:', err);
          alert('Erro ao atualizar currículo.');
        },
      });
  }

  excluirCurriculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
      this.curriculosService.deleteCurriculo(id).subscribe({
        next: () => {
          alert('Currículo excluído com sucesso!');
          if (this.curriculo.id === id) {
            this.resetarFormulario();
          }
          this.listarCurriculos();
        },
        error: (err) => {
          console.error('Erro ao excluir currículo:', err);
          alert('Erro ao excluir currículo.');
        },
      });
    }
  }

  editarCurriculo(c: Curriculo): void {
    // Cria cópia para edição
    this.curriculo = new Curriculo(
      c.id,
      c.nome,
      c.idade,
      c.telefone,
      c.email,
      c.descricao
    );
  }

  resetarFormulario(): void {
    this.curriculo = new Curriculo(0, '', 0, '', '', '');
  }
}
