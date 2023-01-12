import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { Task } from 'src/app/interfaces/Task';
import { PersonalTasksService } from 'src/app/services/tasks/personal.tasks.service';

@Component({
  selector: 'app-completed.tasks',
  templateUrl: './completed.tasks.component.html',
  styleUrls: ['./completed.tasks.component.css']
})
export class CompletedTasksComponent implements OnInit {

  tasks: Task[]

  selectedTask: Task
  isModalActive: boolean = false

  constructor(private service: PersonalTasksService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks(){
    this.service.getTasks().subscribe({
      next: (response) => {
        this.tasks = response
      },
      error: () => {
        toast({ message: 'Erro ao completar task!!', type: 'is-danger' })
      }
    })
  }

  toggleModal(task: Task){
    this.isModalActive = !this.isModalActive
    this.selectedTask = task
  }

  deleteTask(id: string){
    this.service.delete(id).subscribe({
      next: () => {
        toast({ message: 'Task deletada com sucesso!!', type: 'is-warning' }),
        this.ngOnInit()
      },
      error: () => {toast({ message: 'Erro ao deletar task!!', type: 'is-danger' })}
    
    })
  }

  backPage(){
    this.router.navigate(['tasks'])
  }

}
