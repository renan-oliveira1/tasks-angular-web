import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from 'src/app/interfaces/Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private baseUrl = 'https://task-repository.glitch.me/boards'

  constructor(private http: HttpClient) { }

  getBoards(){
    return this.http.get<Board[]>(this.baseUrl)
  }

  getBoard(id: string){
    const fullUrl = this.baseUrl + '/' + id
    return this.http.get<Board>(fullUrl)
  }

  registerBoard(name: string){
    return this.http.post(this.baseUrl, {name})
  }

  addUser(idBoard: string, idUser: string){
    const json = {
      idBoard: idBoard,
      idUser: idUser
    }

    const fullUrl = this.baseUrl + '/add-user'

    return this.http.patch(fullUrl, json)
  }

  deleteUser(idBoard: string, idUser: string){
    const json = {
      idBoard: idBoard,
      idUser: idUser
    }
    const fullUrl = this.baseUrl + '/remove-user'
    return this.http.patch(fullUrl, json)
  }
}
