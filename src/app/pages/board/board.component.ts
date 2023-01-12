import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { Board } from 'src/app/interfaces/Board';
import { BoardTask } from 'src/app/interfaces/BoardTask';
import { TaskStatus } from 'src/app/interfaces/TaskStatus';
import { BoardService } from 'src/app/services/board/board/board.service';
import { TasksService } from 'src/app/services/board/tasks/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  idFromUrl: string
  board: Board
  taskForm = {
    name: '',
    description: ''
 }
  
  isModalActive: boolean = false
  isModalStartedActive: boolean = false
  isModalDoneActive: boolean = false
  selectedTask = {
     id: '',
     name: '',
     description: ''
  }
  isShowFormUpdateActive: boolean = false
  isShowFormCreateActive: boolean = false

  unassignedStatus = TaskStatus.UNASSIGNED
  startedStatus = TaskStatus.STARTED
  completedStatus = TaskStatus.COMPLETED


  constructor(
    private boardService: BoardService,
    private taskService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBoard()
  }


  loadIdFromUrl(){
    this.idFromUrl = this.activatedRoute.snapshot.paramMap.get('id')
  }

  loadBoard(){
    this.loadIdFromUrl()
    this.boardService.getBoard(this.idFromUrl).subscribe({
      next: (response) => {this.board = response},
      error: () => {
        toast({ message: 'Board não encontrado!!', type: 'is-warning' })
        this.router.navigate(['boards'])
      }
    })
  }

  submit(){
    if(this.taskForm.name && this.taskForm.description){
      console.log(!this.taskForm.name)
      const{ name, description} = this.taskForm
      this.taskService.saveTask(name, description, this.board.id)
        .subscribe({
          next: () => {
            toast({ message: 'Task registrada com sucesso!!', type: 'is-success' }),
            this.isShowFormCreateActive = false
            this.ngOnInit()
          },
          error: () => {toast({ message: 'Erro ao mandar task!!', type: 'is-danger' })}
        })
    }else{
      toast({ message: 'Campos invalidos!!', type: 'is-danger' })
    }
  }

  configureBoard(){
    const url = 'configure/' + this.idFromUrl
    this.router.navigate([url])
  }

  backPage(){
    const url = 'boards'
    this.router.navigate([url])
  }

  updateTask(task: BoardTask){
    this.taskService.update(task).subscribe({
      next: () => {this.ngOnInit()},
      error: () => {toast({ message: 'Erro ao atualizar a tarefa!!', type: 'is-danger' }); location.reload()}
    })
  }

  deleteTask(id: string){
    this.taskService.remove(id).subscribe({
      next: () => {this.ngOnInit()},
      error: () => {toast({ message: 'Erro ao deletar tarefa!!', type: 'is-danger' })}
    })
  }

  updateStatusTask(id: string, taskStatus: TaskStatus){
    this.taskService.updateStatus(id, taskStatus).subscribe({
      next: () => {this.ngOnInit()},
      error: () => {toast({ message: 'Erro ao completar tarefa!!', type: 'is-danger' })}
    })
  }

  toggleModal(task: BoardTask){
    this.isModalActive = !this.isModalActive
    this.selectedTask = task
  }

  toggleStartedModal(task: BoardTask){
    this.isModalStartedActive = !this.isModalStartedActive
    this.selectedTask = task
  }

  toggleModalDone(task: BoardTask){
    this.isModalDoneActive = !this.isModalDoneActive
    this.selectedTask = task
  }

  showFormCreate(){
    this.isShowFormCreateActive = !this.isShowFormCreateActive
  }

  showFormUpdate(task: BoardTask){
    this.isShowFormUpdateActive = !this.isShowFormUpdateActive
    this.selectedTask = task
  }

}
