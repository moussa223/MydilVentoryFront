import { Component, OnInit, Input } from '@angular/core';
import {SettingService} from '../../../views/admin/settings/setting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }
  private _color = 'light';
  // -----------------------------------------------
  test:any;
  ProductData: any; // Contient les infos de tous les objets de la Base de données Mydil
  isUpdateProductPopUpOpen = false; //  Le pop up est fermé par defaut donc false
  selectedProduct: any | null = null;  // La classe selectionné parmi la liste des classes
  UpdateProductDto: any = {
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

  constructor(public settingService:SettingService,private router:Router) {}

  ngOnInit(): void {
    this.getAllProducts()
  }
  // ----------------- get All Products-------------
  getAllProducts(){
    this.settingService.getAllProducts().subscribe(
      (Products) => {
        // Vous pouvez utiliser les données des étudiants ici
        console.log(Products);
        this.ProductData = Products;
        console.log(this.ProductData[0].name);
        this.test = this.ProductData[0].levels + ' ' + this.ProductData[0].name;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(error);
      }
    );
  }
  // ----------------------- Selected Product --------------------------------
  selectProduct(product:any): void{
    this.selectedProduct = product;
    this.openUpdateProductPopup();
  }
  // ----------------- Update Product Method -----------------------------------
  UpdateProduct(){
    // tslint:disable-next-line:max-line-length
    this.UpdateProductDto.id = this.selectedProduct.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
    this.settingService.UpdateProduct(this.selectedProduct.id,this.UpdateProductDto).subscribe(
      (response) => {
        // Gérez la réponse de l'API ici
        console.log(response);
        // fermeture du popup Après le traitement
        this.closeUpdateProductPopup();
        // Rechargez la page après une réponse réussie
        window.location.reload();
      },
      (error) => {
        // Gérez les erreurs ici
        // console.error(error.error.message);
        console.error(error);
      }
    );
  }
  // -------------Up date classRoom Pop Up -----------------------------------------------
  openUpdateProductPopup() {
    this.isUpdateProductPopUpOpen = true;
  }
  closeUpdateProductPopup() {
    this.isUpdateProductPopUpOpen = false;
  }
}
