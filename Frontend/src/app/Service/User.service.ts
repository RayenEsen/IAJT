import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../Shared/User';
@Injectable({
  providedIn: 'root'
})


export class UserService {

  private url: string = environment.apiBaseUrl + '/users';

  constructor(private http: HttpClient) { }


registerUser(newUser: User): Observable<User> {
  return this.http.post<User>(`${this.url}/register`, newUser);
}
}
