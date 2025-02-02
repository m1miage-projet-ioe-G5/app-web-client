import {Component, ViewChild} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { UserComponent } from './components/user/user.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {MatFormField} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    UserComponent,
    LeafletModule,
    MatFormField,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Correction ici
})
export class AppComponent {
  title = 'clientMoovly';

  @ViewChild('drawer') drawer!: MatDrawer;

  // Méthode pour forcer la mise à jour de Leaflet quand le menu est ouvert/fermé
  onDrawerToggle() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }


}
