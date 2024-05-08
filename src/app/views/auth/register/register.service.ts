import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  model: any = {
    lastName: '',
    firstName: '',
    birthDate:'',
    userName:'',
    email:'',
    password: '',
    phoneNumber:'',
    classRoom: '',
    isAdmin: false
  };
  confirmPassword: '';
  // L'adresse de l'api de prod: https://keepschool.azurewebsites.net/api/AuthContoller/Register
  // L'adresse de l'api en local : https://localhost:7012/api/AuthContoller/Register
  private apiRegisterUrl = 'https://keepschool.azurewebsites.net/api/AuthContoller/Register'; //  l'URL de l' API

  constructor(private http:HttpClient) { }
  registerUser() {
    //  appel POST vers la route "register" de l' API
    return this.http.post(this.apiRegisterUrl, this.model);
  }
}
