import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/Task';

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

  updateStatus(id: string, complete: boolean){
    const json = {
      id: id,
      complete: complete
    }

    return this.http.patch(this.baseUrl, json)
  }

  update(task: Task): Observable<any>{
    return this.http.put(this.baseUrl, task)
  }

  remove(id: string){
    return this.http.delete(this.baseUrl + "/" + id)
  }
}
