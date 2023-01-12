import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { Task } from 'src/app/interfaces/Task';
import { PersonalTasksService } from 'src/app/services/tasks/personal.tasks.service';

@Component({
  selector: 'app-personal.tasks',
  templateUrl: './personal.tasks.component.html',
  styleUrls: ['./personal.tasks.component.css']
})
export class PersonalTasksComponent implements OnInit {

  tasks: Task[]
  taskForm: FormGroup
  
  selectedTask: Task
  isModalActive: boolean = false
  isShowFormUpdateActive = false

  taskFormHelper: FormGroup

  constructor(private service: PersonalTasksService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
    this.loadTasks()
  }

  loadTasks(){
    this.service.getTasks().subscribe(response => {
      this.tasks = response
      console.log(response)
    })
  }

  initForm(){
    this.taskForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    if(this.taskForm.valid){
      const date: string = this.taskForm.get('date').value + ' ' + this.taskForm.get('time').value
      console.log(date)
      const task: Task = {
        name: this.taskForm.get('name').value,
        description: this.taskForm.get('description').value,
        date: date,
        complete: false
      }

      this.service.saveTask(task).subscribe({
        next: () => {
          toast({ message: 'Task registrada com sucesso!!', type: 'is-success' }),
          this.ngOnInit()
        },
        error: () => {toast({ message: 'Erro ao mandar task!!', type: 'is-danger' })}
      })
    }else{
      toast({ message: 'Preencha os campos válidos!!', type: 'is-danger' })
    }
  }

  toggleModal(task: Task){
    this.isModalActive = !this.isModalActive
    this.selectedTask = task
  }

  showFormUpdate(task: Task){
    this.isShowFormUpdateActive = !this.isShowFormUpdateActive
    this.selectedTask = task
    this.taskFormHelper = new FormGroup({
      name: new FormControl(task.name, [Validators.required]),
      description: new FormControl(task.description, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      time: new FormControl(null, [Validators.required])
    })
  }

  updateTask(){
    if(this.taskFormHelper.valid){
      const date: string = this.taskFormHelper.get('date').value + ' ' + this.taskFormHelper.get('time').value
      const task: Task = {
        id: this.selectedTask.id,
        name: this.taskFormHelper.get('name').value,
        description: this.taskFormHelper.get('description').value,
        date: date,
        complete: false
      }

      this.service.updateTask(task).subscribe({
        next: () => {
          toast({ message: 'Task editada com sucesso!!', type: 'is-success' }),
          this.showFormUpdate(this.selectedTask)
          this.ngOnInit()
        },
        error: () => {toast({ message: 'Erro ao editar task!!', type: 'is-danger' })}
      })
    }else{
      toast({ message: 'Preencha os campos válidos!!', type: 'is-danger' })
    }
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

  updateStatusTask(idTask: string){
    this.service.updateStatusTask(idTask, true).subscribe({
      next: () => {
        toast({ message: 'Task completada com sucesso!!', type: 'is-success' }),
        this.ngOnInit()
      },
      error: () => {toast({ message: 'Erro ao completar task!!', type: 'is-danger' })}
    })
  }

  showCompletedTasks(){
    this.router.navigate(['completed'])
  }

  backPage(){
    this.router.navigate(['home'])
  }

}
