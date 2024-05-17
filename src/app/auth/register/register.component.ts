import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required, Validators.minLength(8)],],
    password2: ['', [Validators.required, Validators.minLength(8)],],
    terminos: [false, Validators.required,],

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }


  crearUsuario() {
    this.formSubmitted = true
    console.log(this.registerForm)
    Swal.fire({
      title: 'Espere porfavor',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    if (this.registerForm.invalid) {
      console.log('Error');
      Swal.fire({
        title: `No se pudo agregar`,
        text: `Todos los campos son obligatorios`,
        icon: 'error'
      })
      return Object.values(this.registerForm.controls).forEach(control => {
        control.markAllAsTouched();

      });
    }

    if (this.registerForm.valid) {
      console.log('bien');
      this.userService.crearUser(this.registerForm.value).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            title: `Agregado correctamente`,
            text: `User agregado correctamente`,
            icon: 'success'
          })
          this.router.navigate(['/login'])
        },
        (err) => {
          console.log(err);
          Swal.fire({
            title: `Error`,
            text: ` ${err.error.msg}`,
            icon: 'error'
          });
        }
      )
    }

  }


  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched) {

    // if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }


  }

  contrasenasIguales() {
    const pass = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value
    if ((pass !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  passwordsIguales(pass1: string, pass2: string) {

    return (FormGroup: FormControl) => {
      const pass1Control = FormGroup.get(pass1);
      const pass2Control = FormGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {

        pass2Control?.setErrors(null);
      } else {

        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }


  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  campoVacio(campo: string): boolean {
    if ((this.registerForm.get(campo)?.value === '') && this.registerForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

}
