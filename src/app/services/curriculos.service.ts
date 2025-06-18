import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl: string = 'http://localhost:3005/curriculos'; //endereço da API

  constructor(private http: HttpClient){ }

  // criar os metodos conexões com a ApiREST

  // get
  getCurriculos(): Observable<Curriculo[]> { //observable -> rxjs => tradutor de json para ts
    return this.http.get<Curriculo[]>(this.apiUrl); //conecta com a api para coletar os dados
  }
  // post
  postCurriculo(curriculo:Curriculo): Observable<Curriculo[]>{
    return this.http.post<Curriculo[]>(this.apiUrl,curriculo);
    //observable -> rxjs => tradutor de Json para typescript 
  }
  // put
  // nomeDoMétodo(parâmetros)
  putCurriculo(id: any, curriculo:Curriculo): Observable<Curriculo[]>{ //coleção chave -> valor
    
    //http://localhost:3000/Curriculos/"xxxx"
    const url = `${this.apiUrl}/${id}`; //construir a url join(api + id)
    return this.http.put<Curriculo[]>(url, curriculo);
  }
  // delete
  deleteCurriculo(id: any): Observable<Curriculo[]>{
    const url = this.apiUrl+"/"+id;
    return this.http.delete<Curriculo[]>(url);
  } 

  // diferença put e path
  // put -> atualiza mais doq um Valor
  // path -> permite atualizar apenas uma informação
}
