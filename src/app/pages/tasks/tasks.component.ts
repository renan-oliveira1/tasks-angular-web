import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { BoardService } from 'src/app/services/board/board.service';
import {Board }from '../../interfaces/Board'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  boardForm: FormGroup
  boards: Board[]

  constructor(private boardService: BoardService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
    this.loadBoards()
  }

  loadBoards(){
    this.boardService.getBoards().subscribe(response => {
      this.boards = response
    })
  }
  
  initForm(){
    this.boardForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    })
  }

  viewBoard(idBoard: string){
    const url = 'board/' + idBoard
    this.router.navigate([url])
  }

  submit(){
    if(this.boardForm.valid){
      const name = this.boardForm.get('name').value
      this.boardService.registerBoard(name).subscribe({
        next: () => this.registerBoard(),
        error: () => toast({ message: 'Erro ao conectar com o servidor!!', type: 'is-danger' })
      })
    }else{
      toast({ message: 'Preencha os campos válidos!!', type: 'is-danger' })
    }
  }

  registerBoard(){
    toast({ message: 'Board registrado com sucesso!!', type: 'is-success' })
    this.ngOnInit()
  }

}
