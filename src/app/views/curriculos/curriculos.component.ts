import { Component, OnInit } from '@angular/core';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosService } from 'src/app/services/curriculos.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})

//controller -> view -> model
export class CurriculosComponent implements OnInit {
  public curriculos: Curriculo[] = []; // vetor para armazenar as Curriculos do BD

  constructor(private _curriculosService: CurriculosService){}
  //injeta o serviço de Curriculos  dentro do componente

  ngOnInit(): void {
    this.listarCurriculos();
  }

  //função para listar as Curriculos

  listarCurriculos(){
    this._curriculosService.getCurriculos().subscribe( // subscribe é um método do Observable que permite recerber os dados e tratar para vetor
      (e) => { // listar Curriculo por Curriculo dentro do vetor
        this.curriculos= e.map(
          (curriculo) => {
            return Curriculo.fromMap(curriculo);
          }
        );
      }
    )
  }

}
