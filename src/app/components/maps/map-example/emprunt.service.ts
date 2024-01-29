import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  empruntModel: any = {
    empruntDto: {
      id: 0,
      dateEmprunt: '',
      dateRetourPrevu: '',
      commentairesEmprunt: '',
      statutEmprunt: '',
      userIds: [
        0
      ],
      productIds: [
        0
      ]
    }
  };
  private GetAllEmpruntUrl = 'https://localhost:7012/api/Emprunt/GetAllEmprunts';
  private AddEmpruntUrl = 'https://localhost:7012/api/Emprunt/Create';
  private UpdateEmpruntUrl = 'https://localhost:7012/api/Emprunt/Update';
  private DeleteEmpruntUrl = 'https://localhost:7012/api/Emprunt/Delete';
  constructor(private http:HttpClient) { }
  // --------------------------Get All Emprunts------------------------
  getAllEmprunts(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllEmpruntUrl}`,{ headers });
  }
  // ------------------ Create Emprunt --------------------------------
  CreateEmprunt(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel POST vers la route "register" de l'API
    return this.http.post(this.AddEmpruntUrl, this.empruntModel, { headers });
  }
  // -----------------Update Emprunt ------------------------------------
  UpdateEmprunt(empruntId: number, updatedEmpruntDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateEmprunt de l'API
    return this.http.put(`${this.UpdateEmpruntUrl}/${empruntId}`, updatedEmpruntDto, {headers});
  }
// ---------------- Delete Emprunt ------------------------------------
  DeleteEmprunt(empruntId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateEmprunt de l'API
    return this.http.delete(`${this.DeleteEmpruntUrl}/${empruntId}`, {headers});
  }
  //
}
