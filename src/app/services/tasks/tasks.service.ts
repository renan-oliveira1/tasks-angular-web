import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  saveTask(name: string, description: string, idBoard: string){
    const sendJson = {
      name: name,
      description: description,
      board: idBoard
    }

    return this.http.post<Task>(this.baseUrl, sendJson)
  }
}
