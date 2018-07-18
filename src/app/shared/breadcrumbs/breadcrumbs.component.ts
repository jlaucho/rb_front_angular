import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titlePage: any = 'Titulo Breadcrumbs';
  izquierda: string = 'Izquierda';
  medio: string = 'medio';
  derecha: string = 'Derecha';

  // @Output() titulo: EventEmitter<string> = new EventEmitter();


  constructor(private router: Router) {
    this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    )
    .subscribe( event => {
      console.log( event );
      this.getDataRoute( event );

    });
  }

  ngOnInit() {
  }

  getDataRoute( data ) {
    this.titlePage = data.title;
    this.izquierda = data.izquierda;
    this.medio = data.medio;
    this.derecha = data.derecha;
  }

}
