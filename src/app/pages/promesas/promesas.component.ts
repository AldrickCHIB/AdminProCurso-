import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrl: './promesas.component.css'
})
export class PromesasComponent implements OnInit {

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    })
    // const promesa = new Promise((resolve, reject) => {

    //   if(false){
    //     resolve("Hola Mundo");
    //   }else {
    //     reject('error')
    //   }

    // });

    // promesa.then((mensaje) => {
    //   console.log(mensaje);
    // }).catch ((error) => {
    //   console.log("Error en la promesa", error);
    // })

    // console.log("Fin del init");

  }

  getUsuarios() {

    const promesa = new Promise((resolve, reject) => {
      
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => {
          resp.json().then((body) => {
            resolve(body.data);
          });
        })
        .catch(() => {
          
        })
      
    });
    return promesa;
  }


}
