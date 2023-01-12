import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl)
  }
}
