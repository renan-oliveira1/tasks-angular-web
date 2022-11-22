import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.verifyIsLoggedRedirect()
  }

  logout(){
    toast({ message: 'Usuario saiu da conta!!', type: 'is-warning' })
    this.authService.logout()
    this.router.navigate(['login'])
  }

}
