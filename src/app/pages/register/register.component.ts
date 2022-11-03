import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    private router: Router,
    private service: AuthService
    ) { }

  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm(){
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit(){
    if(this.registerForm.valid){
      const username = this.registerForm.get('username').value
      const email = this.registerForm.get('email').value
      const password = this.registerForm.get('password').value
      this.service.register(username, email, password).subscribe({
        next: (response) => this.doLogin(),
        error: (error) => toast({ message: 'Preencha os campos válidos!!\n' + error.error.message, type: 'is-danger' })
      })
    }
    else{
      toast({ message: 'Preencha os campos válidos!!', type: 'is-danger' })
    }
  
  }

  doLogin(){
    toast({ message: 'Preencha os campos válidos!!', type: 'is-success' })
    this.router.navigate(['tasks'])
  }

  backLoginPage(){
    this.router.navigate(['/login'])
  }

}
