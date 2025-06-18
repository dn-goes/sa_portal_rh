import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';

@Injectable({
  providedIn: 'root',
})
export class CurriculosService {
  private apiUrl = 'http://localhost:3000/curriculos'; // ajuste para seu json-server

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  postCurriculo(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo.toMap());
  }

  putCurriculo(id: number, curriculo: Curriculo): Observable<Curriculo> {
    return this.http.put<Curriculo>(`${this.apiUrl}/${id}`, curriculo.toMap());
  }

  deleteCurriculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
