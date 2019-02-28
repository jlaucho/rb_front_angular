import { Component, OnInit } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  colorCkeck: string = 'cornsilk';

  constructor() { }

  ngOnInit() {
  }

  agregarComponente() {
    this.colorCkeck = 'black';
    console.log('desde el composnete de checkAndUpdateBinding');
  }

}
