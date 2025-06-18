import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl: string = 'http://localhost:3005/vagas'; // URL base da API

  constructor(private http: HttpClient) { }

  // GET - Buscar todas as vagas
  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  // POST - Cadastrar nova vaga
  postVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga);
  }

  // PUT - Atualizar vaga existente
  putVaga(id: number, vaga: Vaga): Observable<Vaga> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Vaga>(url, vaga);
  }

  // DELETE - Remover vaga por ID
  deleteVaga(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
