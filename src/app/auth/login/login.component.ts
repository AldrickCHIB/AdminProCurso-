import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }



  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }

  }

  campoVacio(campo: string): boolean {
    if ((this.loginForm.get(campo)?.value === '') && this.loginForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.formSubmitted = true;
    console.log(this.loginForm);
    Swal.fire({
      title: 'Iniciando Sesión',
      icon: 'info',
      allowOutsideClick: false
    });
  
    Swal.showLoading();
  
    if (this.loginForm.invalid) {
      console.log('Error');
      Swal.fire({
        title: `No se pudo agregar`,
        text: `Todos los campos son obligatorios`,
        icon: 'error'
      });
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
  
    if (this.loginForm.valid) {
      console.log('bien');
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.userService.login({ email, password }).subscribe(
          (response) => {
            console.log(response);
            Swal.fire({
              title: `Inición Sesiada`,
              text: `Sesión iniciada correctamente`,
              icon: 'success'
            });
            this.router.navigate(['/dashboard']);
          },
          (err: any) => {
            console.log(err);
            Swal.fire({
              title: `Error`,
              text: ` ${err.error.msg}`,
              icon: 'error'
            });
          }
        );
      } else {
        console.log('Email or password is null or undefined');
      }
    }
  }
  

}
