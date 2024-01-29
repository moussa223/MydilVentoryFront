import { Component, OnInit } from '@angular/core';
import {EmpruntService} from '../../maps/map-example/emprunt.service';
import {SettingService} from '../../../views/admin/settings/setting.service';

@Component({
  selector: 'app-card-page-visits',
  templateUrl: './card-page-visits.component.html',
})
export class CardPageVisitsComponent implements OnInit {
  EmpruntData: any; // Contient les infos de tous les objets de la Base de données Mydil
  ProductData: any; // Contient les infos de tous les objets de la Base de données Mydil
  constructor(public empruntService:EmpruntService,public settingService:SettingService) {}

  ngOnInit(): void {
    this.getAllEmprunts();
    this.getAllProducts();
  }
  // ----------------- get All Emprunts-------------
  getAllEmprunts(){
    this.empruntService.getAllEmprunts().subscribe(
      (Emprunts) => {
        // Vous pouvez utiliser les données des étudiants ici
        console.log('les emprunts: '+Emprunts);
        this.EmpruntData = Emprunts;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(error);
      }
    );
  }
  // ----------------- get All Products-------------
  getAllProducts(){
    this.settingService.getAllProducts().subscribe(
      (Products) => {
        // Vous pouvez utiliser les données des étudiants ici
        console.log(Products);
        this.ProductData = Products;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(error);
      }
    );
  }
}
