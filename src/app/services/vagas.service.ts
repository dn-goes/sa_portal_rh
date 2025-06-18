import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl: string = 'http://localhost:3005/vagas'; //endereço da API

  constructor(private http: HttpClient){ }

  // criar os metodos conexões com a ApiREST

  // get
  getVagas(): Observable<Vaga[]> { //observable -> rxjs => tradutor de json para ts
    return this.http.get<Vaga[]>(this.apiUrl); //conecta com a api para coletar os dados
  }
  // post
  postVaga(vaga:Vaga): Observable<Vaga[]>{
    return this.http.post<Vaga[]>(this.apiUrl,vaga);
    //observable -> rxjs => tradutor de Json para typescript 
  }
  // put
  // nomeDoMétodo(parâmetros)
  putVaga(id: any, vaga:Vaga): Observable<Vaga[]>{ //coleção chave -> valor
    
    //http://localhost:3000/vagas/"xxxx"
    const url = `${this.apiUrl}/${id}`; //construir a url join(api + id)
    return this.http.put<Vaga[]>(url, vaga);
  }
  // delete
  deleteVaga(id: any): Observable<Vaga[]>{
    const url = this.apiUrl+"/"+id;
    return this.http.delete<Vaga[]>(url);
  } 

  // diferença put e path
  // put -> atualiza mais doq um Valor
  // path -> permite atualizar apenas uma informação
}
