import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initLoginForm()
    this.verifyIfLogged()
  }

  verifyIfLogged(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['boards'])
    }
  }

  initLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    if(this.loginForm.valid){
      const email = this.loginForm.get('email').value
      const password = this.loginForm.get('password').value

      this.authService.login(email, password).subscribe({
        next: (response) => this.doLogin(),
        error: (error) => toast({ message: 'Erro ao efetuar login!!\n' + error.error, type: 'is-danger' })
      })
    }else{
      toast({ message: 'Preencha os campos válidos!!', type: 'is-danger' })
    }
  }

  doLogin(){
    toast({ message: 'Login feito com sucesso!!', type: 'is-success' })
    this.router.navigate(['boards'])
  }

}
