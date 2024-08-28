import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ParkUser } from '../Shared/ParkUser';

@Injectable({
  providedIn: 'root'
})
export class ParkuserService {

  private url: string = environment.apiBaseUrl + '/parkusers';

  constructor(private http: HttpClient) { }

  // Récupère tous les utilisateurs
  getAllUsers(): Observable<ParkUser[]> {
    return this.http.get<ParkUser[]>(this.url);
  }

  // Récupère un utilisateur spécifique par ID
  getUserById(id: number): Observable<ParkUser> {
    const url = `${this.url}/${id}`;
    return this.http.get<ParkUser>(url);
  }

  // Crée ou met à jour un utilisateur
  createUser(user: ParkUser): Observable<ParkUser> {
    return this.http.post<ParkUser>(this.url, user);
  }

  // Supprime un utilisateur
  deleteUser(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
}
