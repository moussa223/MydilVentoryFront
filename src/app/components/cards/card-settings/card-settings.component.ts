import { Component, OnInit } from '@angular/core';
import {SettingService} from '../../../views/admin/settings/setting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
})
export class CardSettingsComponent implements OnInit {
  constructor(public settingService:SettingService,private router:Router) {}

  ngOnInit(): void {}
  // ------------------------- Create Product -------------------------
  CreateProduct(){
    this.settingService.CreateProduct().subscribe(
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
  // Création d'une classe
  onSubmit() {
    this.CreateProduct();
    // Rechargez la page après une réponse réussie
    // window.location.reload(); // cela ne fonctionne pas en prod sur le serveur Azure
    this.router.navigate(['admin/tables']) // d'après mon experience, il est bon de faire router.navigate car
    // cela fonctionne en prod et non window.lacation.reload
  }
}
