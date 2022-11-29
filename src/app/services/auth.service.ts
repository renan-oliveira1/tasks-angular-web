import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://task-repository.glitch.me/user'

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    let body = {
      email: email,
      password: password
    }

    const fullUrl = this.baseUrl + '/login'
    return this.http.post(fullUrl, body).pipe(
      tap(response => {
        this.setSession(response)
      })
    )
  }

  register(username: string, email: string, password: string){
    let body = {
      username: username,
      email: email,
      password: password
    }

    const fullUrl = this.baseUrl + '/register'
    return this.http.post(fullUrl, body).pipe(
      tap(response => {
        this.setSession(response)
      })
    )
  }

  setSession(apiResult){
    sessionStorage.setItem('token', apiResult.token)
  }

  logout(){
    sessionStorage.removeItem('token')
  }

  isLoggedIn(): boolean{
    if(sessionStorage.getItem('token')) return true
    return false
  }

  verifyIsLoggedRedirect(){
    if(!this.isLoggedIn()){
      this.router.navigate(['login'])
    }
  }


}
