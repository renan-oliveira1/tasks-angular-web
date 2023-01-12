import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class PersonalTasksService {

  private baseUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<Task[]>(this.baseUrl)
  }

  saveTask(task: Task){
    return this.http.post<Task>(this.baseUrl, task)
  }

  updateTask(task: Task){
    console.log(task)
    return this.http.put<Task>(this.baseUrl, task)
  }

  updateStatusTask(idTask: string, status: boolean){
    const json = {
      id: idTask,
      complete: status
    }

    return this.http.patch(this.baseUrl, json)
  }

  delete(id: string){
    const fullUrl = this.baseUrl + '/' + id
    return this.http.delete(fullUrl)
  }
}
