// Importation des modules nécessaires d'Angular et Angular Material
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MatListModule } from '@angular/material/list';



// Définition du composant principal
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule, MatListModule,  // Modules Angular et Angular Material utilisés
    CdkDropList, CdkDrag,         // Modules nécessaires pour les fonctionnalités de drag-and-drop
  ],
  templateUrl: './lists.component.html',  // Chemin vers le template HTML
  styleUrl: './lists.component.scss',    // Chemin vers le style CSS
  changeDetection: ChangeDetectionStrategy.OnPush, // Stratégie de détection des changements
})
export class ListsComponent {

}
