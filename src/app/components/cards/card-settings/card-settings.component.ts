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
    window.location.reload();
  }
}
