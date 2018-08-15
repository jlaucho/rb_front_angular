import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {

  @Input() type: string = 'warning';
  @Input() mensaje: string = 'Mensaje de modal';

  constructor() { }

  ngOnInit() {
  }

}
