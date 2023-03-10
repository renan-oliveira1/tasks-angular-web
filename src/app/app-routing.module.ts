import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { ConfigureComponent } from './pages/configure/configure.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonalTasksComponent } from './pages/personal.tasks/personal.tasks.component';
import { CompletedTasksComponent } from './pages/completed.tasks/completed.tasks.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'boards', component: TasksComponent},
  {path:'board/:id', component: BoardComponent},
  {path: 'configure/:id', component: ConfigureComponent},
  {path:'tasks', component: PersonalTasksComponent},
  {path:'completed', component: CompletedTasksComponent},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
