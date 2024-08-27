import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ordinateurs } from '../Shared/Ordinateurs';

@Injectable({
  providedIn: 'root'
})
export class OrdinateurService {

  url: string = environment.apiBaseUrl + '/computers';

  constructor(private http: HttpClient) { }

  GetOrdinateurs(): Observable<Ordinateurs[]> {
    return this.http.get<Ordinateurs[]>(this.url);
  }

  GetOrdinateurById(id: number): Observable<Ordinateurs> {
    return this.http.get<Ordinateurs>(`${this.url}/${id}`);
  }
  CreateOrdinateur(ordinateur: Ordinateurs): Observable<Ordinateurs> {
    return this.http.post<Ordinateurs>(this.url, ordinateur);
  }
  
  UpdateOrdinateur(id: number, ordinateur: Ordinateurs): Observable<Ordinateurs> {
    return this.http.put<Ordinateurs>(`${this.url}/${id}`, ordinateur);
  }
  

  DeleteOrdinateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
