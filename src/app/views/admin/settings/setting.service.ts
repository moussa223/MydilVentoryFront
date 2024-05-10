import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  ProductModel: any = {
    ProductDto: {
      id: 0,
      name: '',
      type: '',
      description: '',
      quantiteDispo: '',
      designation: '',
      commentaires: '',
      emplacement: '',
      dateAchat: '',
      iEmpruntable: '',
      isReferenced: '',
      photoUrl: ''
    }
  };
  private AddProductUrl = 'https://keepschool.azurewebsites.net/api/Product/Create';
  private GetAllProductUrl = 'https://keepschool.azurewebsites.net/api/Product/GetAllProducts';
  private UpdateProductUrl = 'https://keepschool.azurewebsites.net/api/Product/Update';
  private DeleteProductUrl = 'https://keepschool.azurewebsites.net/api/Product/Delete';
  constructor(private http: HttpClient) { }

  // --------------------------Get All Products------------------------
  getAllProducts(): Observable<any[]>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.GetAllProductUrl}`,{ headers });
  }
  // ------------------ Create Product --------------------------------
  CreateProduct(){
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.AddProductUrl, this.ProductModel, { headers });
  }
  // -----------------Update Product ------------------------------------
  UpdateProduct(ProductId: number, updatedProductDto: any): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateProduct de l'API
    return this.http.put(`${this.UpdateProductUrl}/${ProductId}`, updatedProductDto, {headers});
  }
  // ---------------- Delete Product ------------------------------------
  DeleteCourseFromProduct(productId: number): Observable<any>{
    // Récupérer le token depuis le local storage
    const token = localStorage.getItem('usingsecretkeyforapp');
    // Ajout du token dans le header de la réquête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // Appel de la méthode Http put UpdateProduct de l'API
    return this.http.delete(`${this.DeleteProductUrl}/${productId}`, {headers});
  }
  //
}
