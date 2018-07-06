import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;
  
  constructor() {
    this.forma = new FormGroup({
      email: new FormControl()
    });
  }

  ngOnInit() {
  }

}
