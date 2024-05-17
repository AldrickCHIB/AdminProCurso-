import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { map, tap } from 'rxjs';
// import { UsuarioLogin } from '../models/usuarioLogin.model';

interface UsuarioLogin {
  email: string,
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {




  private URL: string = "http://127.0.0.1:3000/api/usuarios/"

  private URL2: string = "http://127.0.0.1:3000/api/login/"

  constructor(private http: HttpClient) { }

  crearUser(user: Usuario) {
    return this.http.post(`${this.URL}`, user)
      // .pipe(map((response: any) => {
      //   user = response;
      //   return user;

      // }))
  }

  login(userData: UsuarioLogin) {
    return this.http.post(`${this.URL2}`, userData)
       .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token)
        })
       )
  }

}
