import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavComponent } from './pages/nav/nav.component';
import { FooterComponent } from './pages/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TasksComponent } from './pages/tasks/tasks.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginInterceptor } from './services/interceptors/login.interceptor';
import { BoardComponent } from './pages/board/board.component';
import { ConfigureComponent } from './pages/configure/configure.component';
import { ClimaDeCopaPipe } from './clima-de-copa.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    TasksComponent,
    NotfoundComponent,
    BoardComponent,
    ConfigureComponent,
    ClimaDeCopaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
