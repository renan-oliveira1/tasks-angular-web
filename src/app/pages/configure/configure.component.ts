import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { Board } from 'src/app/interfaces/Board';
import { User } from 'src/app/interfaces/User';
import { BoardService } from 'src/app/services/board/board/board.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  usersNotInBoard: User[]
  idBoard: string
  board: Board

  constructor(
    private userService: UserService, 
    private boardService: BoardService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBoard()
    
  }

  loadBoard(){
    this.idBoard = this.activatedRoute.snapshot.paramMap.get('id')
    this.boardService.getBoard(this.idBoard).subscribe({
      next: (response) => { this.board = response, this.loadUsers()},
      error: () => {
        toast({ message: 'Erro ao carregar board!!', type: 'is-danger' }), 
        this.router.navigate(['boards'])
      }
    })
  }

  loadUsers(){
    console.log(this.board.users.length)
    this.userService.getUsers().subscribe({
      next: (response) => { this.filterUsersNotInBoard(response)},
      error: () => {toast({ message: 'Erro ao carregar usuarios do servidor!!', type: 'is-danger' })}
    })
  }

  filterUsersNotInBoard(users: User[]){

    var mapOfUsers = new Map(users.map(user => [user.id, user]));

    this.usersNotInBoard = []

    this.board.users.forEach(user =>{
      if(mapOfUsers.has(user.id)){
        mapOfUsers.delete(user.id)
      }
    })

    this.usersNotInBoard = Array.from(mapOfUsers.values())
  }

  addUserBoard(idUser: string){
    this.boardService
      .addUser(this.idBoard, idUser)
      .subscribe({
        next: () => {this.ngOnInit()},
        error: () => {toast({ message: 'Erro ao adicionar usuario!!', type: 'is-danger' })}
    })
  }

  removeUser(idUser: string){
    this.boardService
      .deleteUser(this.idBoard, idUser)
      .subscribe({
        next: () => {this.ngOnInit()},
        error: () => {toast({ message: 'Erro ao remover usuario!!', type: 'is-danger' })}
      })
  }

  backPage(){
    const url = 'board/' + this.idBoard 
    this.router.navigate([url])
  }

}
