import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {

  ngOnDestroy(): void {
    this.intrevalSubs.unsubscribe()
  }

  public intrevalSubs: Subscription;

  constructor() {

    this.intrevalSubs = this.returnInterval().subscribe(
      console.log
    )

    // this.returnObservable().pipe(retry(2)).subscribe(
    //   (valor) => {
    //     console.log('Subscripción', valor)
    //   },
    //   (err) => {
    //     console.log("Error", err);
    //   },
    //   () => {
    //     console.log('obs terminado');
    //   }
    // )

  }

  returnInterval(): Observable<number> {

    return interval(100)
      .pipe(
        map((valor) => {
          return valor + 1
        }),
        filter( valor => valor % 2 === 0 ),
        take(10),
      );

  }


  returnObservable(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>((observer) => {


      const interval = setInterval(() => {
        i++;
        if (i === 4) {
          clearInterval(interval)
          observer.complete()
        }


        if (i === 2) {
          observer.error('i llegó a 2')
        }

        observer.next(i)
      }, 1000)

    });

    return obs$
  }

}
