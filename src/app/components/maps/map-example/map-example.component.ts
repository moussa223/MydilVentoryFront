import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmpruntService} from './emprunt.service';
import {Router} from '@angular/router';
import {createPopper} from '@popperjs/core';

declare const google: any;

@Component({
  selector: 'app-map-example',
  templateUrl: './map-example.component.html',
})
export class MapExampleComponent implements OnInit {
  // ------------------------------------
  test:any;
  EmpruntData: any; // Contient les infos de tous les objets de la Base de données Mydil
  selectedEmprunt: any | null = null;  // L'emprunt selectionné parmi la liste des emprunts
  updatedEmpruntDto:any = {
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
  constructor(public empruntService:EmpruntService, private router:Router) {}
  ngOnInit(): void {
    this.getAllEmprunts();
  }
  // ----------------- get All Emprunts-------------
  getAllEmprunts(){
    this.empruntService.getAllEmprunts().subscribe(
      (Emprunts) => {
        // Vous pouvez utiliser les données des étudiants ici
        console.log('les emprunts: '+Emprunts);
        this.EmpruntData = Emprunts;
        console.log(this.EmpruntData[0].name);
        this.test = this.EmpruntData[0].levels + ' ' + this.EmpruntData[0].name;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error(error);
      }
    );
  }
  // Update emprunt Method to Statut en cours
  UpdateEmprunt(){
    // tslint:disable-next-line:max-line-length
    this.updatedEmpruntDto.id = this.selectedEmprunt.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
    this.updatedEmpruntDto.dateEmprunt = this.selectedEmprunt.dateEmprunt;
    this.updatedEmpruntDto.dateRetourPrevu = this.selectedEmprunt.dateRetourPrevu;
    this.updatedEmpruntDto.commentairesEmprunt = this.selectedEmprunt.commentairesEmprunt;
    this.updatedEmpruntDto.statutEmprunt = 'En cours';
    // this.updatedEmpruntDto.userIds[0] = this.selectedEmprunt.userIds[0];
    // this.selectedEmprunt.productIds[0] = this.selectedEmprunt.productIds[0];
    console.log('SelectedEmprunt contient: '+this.selectedEmprunt);
    this.empruntService.UpdateEmprunt(this.selectedEmprunt.id,this.updatedEmpruntDto).subscribe(
      (response) => {
        // Gérez la réponse de l'API ici
        console.log(response);
        // Rechargez la page après une réponse réussie
        // window.location.reload();
        this.router.navigate(['admin/maps'])
      },
      (error) => {
        // Gérez les erreurs ici
        // console.error(error.error.message);
        console.error(error);
      }
    );
  }
  // Update emprunt Method to Statut en cours
  UpdateEmpruntToTerminer(){
    // tslint:disable-next-line:max-line-length
    this.updatedEmpruntDto.id = this.selectedEmprunt.id; // L'id de la classe que je modifie ne change pas et dans l'objet Json aussi l'id est envoyé aussi
    this.updatedEmpruntDto.dateEmprunt = this.selectedEmprunt.dateEmprunt;
    this.updatedEmpruntDto.dateRetourPrevu = this.selectedEmprunt.dateRetourPrevu;
    this.updatedEmpruntDto.commentairesEmprunt = this.selectedEmprunt.commentairesEmprunt;
    this.updatedEmpruntDto.statutEmprunt = 'Terminé';
    // this.updatedEmpruntDto.userIds[0] = this.selectedEmprunt.userIds[0];
    // this.selectedEmprunt.productIds[0] = this.selectedEmprunt.productIds[0];
    console.log('SelectedEmprunt contient: '+this.selectedEmprunt);
    this.empruntService.UpdateEmprunt(this.selectedEmprunt.id,this.updatedEmpruntDto).subscribe(
      (response) => {
        // Gérez la réponse de l'API ici
        console.log(response);
        // Rechargez la page après une réponse réussie
        // window.location.reload();
        this.router.navigate(['admin/maps'])
      },
      (error) => {
        // Gérez les erreurs ici
        // console.error(error.error.message);
        console.error(error);
      }
    );
  }
  // Delete Course From Emprunt, NB: Cette methode est appelée un peu plus haut, pas duppliquée
  DeleteEmprunt(){
    this.empruntService.DeleteEmprunt(this.selectedEmprunt.id).subscribe(
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
  // ----------------------- Selected Emprunt --------------------------------
  selectEmprunt(emprunt:any): void{
    this.selectedEmprunt = emprunt;
    this.UpdateEmprunt();
  }
  // ----------------------- Selected Emprunt To terminer--------------------------------
  selectEmpruntToTerminer(emprunt:any): void{
    this.selectedEmprunt = emprunt;
    this.UpdateEmpruntToTerminer();
  }
  // ----------------------- Selected Emprunt To Delete--------------------------------
  selectEmpruntToDelete(emprunt:any): void{
    this.selectedEmprunt = emprunt;
    this.DeleteEmprunt();
    // window.location.reload();
    this.router.navigate(['admin/maps']);
  }
}
