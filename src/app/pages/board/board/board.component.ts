import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { Board } from 'src/app/interfaces/Board';
import { BoardService } from 'src/app/services/board/board.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  idFromUrl: string
  board: Board
  taskForm: FormGroup

  constructor(
    private boardService: BoardService,
    private taskService: TasksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBoard()
    this.loadForm()
  }

  loadForm(){
    this.taskForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
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
    if(this.taskForm.valid){
      const name = this.taskForm.get('name').value
      const description = this.taskForm.get('description').value
      this.taskService.saveTask(name, description, this.board.id)
        .subscribe({
          next: () => {
            toast({ message: 'Task registrada com sucesso!!', type: 'is-success' }),
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

}
