import { Component, OnInit, Input } from '@angular/core';
import {SettingService} from '../../../views/admin/settings/setting.service';
import {Router} from '@angular/router';
import {EmpruntService} from '../../maps/map-example/emprunt.service';

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
  isCreateEmpruntPopUpOpen = false; //  Le pop up est fermé par defaut donc false
  selectedProduct: any | null = null;  // La classe selectionné parmi la liste des classes
  valeurStatutEmpruntParDefaut = 'Non Validé';
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

  constructor(public settingService:SettingService,public empruntService:EmpruntService,private router:Router) {}

  ngOnInit(): void {
    this.getAllProducts();
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
  // Création d'un emprunt
  onSubmit() {
    this.CreateEmprunt();
    // Logique pour traiter les données du formulaire ici
    // fermeture du popup Après le traitement
    this.closeCreateEmpruntPopup();
    // Rechargez la page après une réponse réussie
    window.location.reload();
  }
  // ------------------------- Create Emprunt -------------------------
  CreateEmprunt(){
    this.empruntService.empruntModel.empruntDto.statutEmprunt = this.valeurStatutEmpruntParDefaut;
    // On récupère l'id de l'utilisateur connecté et qui a fait la demande d'emprunt
    this.empruntService.empruntModel.empruntDto.userIds[0] = localStorage.getItem('refreshToken');
    this.empruntService.empruntModel.empruntDto.productIds[0] = this.selectedProduct.id;
    this.empruntService.CreateEmprunt().subscribe(
      (response) => {
        // Gérez la réponse de l'API ici
        console.log(response);
      },
      (error) => {
        // Gérez les erreurs ici
        // console.error(error.error.message);
        console.error(error);
      }
    );
  }
  // ----------------------- Selected Product --------------------------------
  selectProduct(product:any): void{
    this.selectedProduct = product;
    this.openUpdateProductPopup();
  }
  // ----------------------- Selected Product To Delete --------------------------------
  selectProductToDelete(product:any): void{
    this.selectedProduct = product;
    this.DeleteProduct();
    // Je recharge la page
    window.location.reload();
  }
  // ------------------ Open Create Emprunt pop up ---------------------------
  selectCreateEmpruntPopUp(product:any): void{
    this.selectedProduct = product;
    this.openCreateEmpruntPopup();
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
  // Delete Course From Product, NB: Cette methode est appelée un peu plus haut, pas duppliquée
  DeleteProduct(){
    this.settingService.DeleteCourseFromProduct(this.selectedProduct.id).subscribe(
      (response) => {
        // Gérez la réponse de l'API ici
        console.log(response);
        // Rechargez la page après une réponse réussie
        // window.location.reload(); // Je l'ai mis en commentaire car avec delete la requête rentre dans le
        // case Error je ne sais pas pourquoi mais je vais recharger la page en haut dans DeleteClass
      },
      (error) => {
        // Gérez les erreurs ici
        // console.error(error.error.message);
        console.error(error);
      }
    );
  }
  // -------------Up date Product Pop Up -----------------------------------------------
  openUpdateProductPopup() {
    this.isUpdateProductPopUpOpen = true;
  }
  closeUpdateProductPopup() {
    this.isUpdateProductPopUpOpen = false;
  }
  // -------------Create Emprunt Pop Up -----------------------------------------------
  openCreateEmpruntPopup() {
    this.isCreateEmpruntPopUpOpen = true;
  }
  closeCreateEmpruntPopup() {
    this.isCreateEmpruntPopUpOpen = false;
  }
}
