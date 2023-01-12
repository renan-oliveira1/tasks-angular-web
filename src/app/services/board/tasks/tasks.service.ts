import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardTask } from 'src/app/interfaces/BoardTask';
import { TaskStatus } from 'src/app/interfaces/TaskStatus';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = 'http://localhost:3000/board-tasks'

  constructor(private http: HttpClient) { }

  saveTask(name: string, description: string, idBoard: string){
    const sendJson = {
      name: name,
      description: description,
      board: idBoard
    }

    return this.http.post<BoardTask>(this.baseUrl, sendJson)
  }

  updateStatus(id: string, taskStatus: TaskStatus){
    const json = {
      id: id,
      status: taskStatus
    }
    console.log(json)

    return this.http.patch(this.baseUrl, json)
  }

  update(task: BoardTask): Observable<any>{
    return this.http.put(this.baseUrl, task)
  }

  remove(id: string){
    return this.http.delete(this.baseUrl + "/" + id)
  }
}
