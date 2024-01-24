import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(public authservice:AuthService) {}

  ngOnInit(): void {}
  OnLogin():void{
    this.authservice.login()
  }
}
