import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, Signal, computed, signal } from '@angular/core';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  LatLng, Layer, TileLayer, tileLayer, polygon,
  Map as LeafletMap,
  Polygon as LeafletPolygon,
  Marker as LeafletMarker,
} from 'leaflet';

import { Subscription } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { GeoapiService, PositionToLatLng } from '../../services/geoapi.service';
import { getObsResize } from './utils/rxjs';
import { HttpClientModule } from '@angular/common/http';
import { getMarker } from './utils/marker';

@Component({
  selector: 'app-carto',
  standalone: true,
  // Injection du service GeoapiService pour récupérer les données des communes
  providers: [GeoapiService],
  imports: [
    // Fournit des directives Angular communes (ex: ngIf, ngFor)
    CommonModule,
    // Module nécessaire pour intégrer Leaflet avec Angular
    LeafletModule,
    // Modules Angular Material pour des listes ou grilles
    MatGridListModule, MatListModule,
    // Permet d'utiliser HttpClient dans les services comme GeoapiService
    HttpClientModule,
  ],
  // Fichier de template HTML associé
  templateUrl: './carto.component.html',
  // Fichier de style associé
  styleUrl: './carto.component.scss',
  // Améliore les performances avec une détection manuelle des changements
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartoComponent implements OnDestroy {
  // Signal pour définir le centre de la carte sur Toulouse (latitude/longitude)
  readonly center = signal<LatLng>(new LatLng(43.604652, 1.444209));

  // Signal pour définir le zoom initial de la carte
  readonly zoom = signal<number>(12);

  // Signal contenant la couche de tuiles OpenStreetMap
  private readonly tileLayer = signal<TileLayer>(
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, // Zoom maximum autorisé
      attribution: '...' // Texte affiché pour attribuer les données à OpenStreetMap
    })
  );

  // Signal contenant l'instance de la carte Leaflet (initialement undefined)
  private readonly leafletMap = signal<LeafletMap | undefined>(undefined);

  // Signal pour stocker les couches (polygones ou marqueurs des communes)
  private readonly communes = signal<(LeafletPolygon | LeafletMarker)[]>([]);

  // Signal qui regroupe toutes les couches à afficher sur la carte (tuiles + communes)
  readonly layers: Signal<Layer[]> = computed(() => [
    this.tileLayer(),
    ...this.communes(),
  ]);

  // Subscription pour gérer l'événement de redimensionnement de la carte
  private subResize?: Subscription;

  /**
   * Enregistre l'instance de la carte Leaflet et gère son redimensionnement.
   * @param m - Instance de la carte Leaflet.
   * @param divMap - Élément HTML contenant la carte.
   */
  registerLeafletMap(m: LeafletMap, divMap: HTMLDivElement): void {
    this.leafletMap.set(m); // Stocke l'instance de la carte
    this.subResize = getObsResize(divMap).subscribe(() => {
      m.invalidateSize({ animate: false }); // Réajuste la taille de la carte
      m.setView(this.center(), this.zoom()); // Recentre la carte sur le centre défini
    });
  }

  constructor(private geoAPI: GeoapiService) {
    // Liste des codes postaux à charger avec leur couleur et nom (seule une commune activée pour le moment)
    [
      { postalCode: "31000", color: "#4169E1", name: "Toulouse Centre" },
    ].forEach(async ({ postalCode, color }) => {
      // Récupère les données de la commune à partir du service GeoAPI
      const [fp, fm] = await this.geoAPI.getCommune(postalCode);

      // Crée un polygone basé sur les coordonnées géographiques de la commune
      const p = polygon(
        //Conversion des coordonnées
        fp.geometry.coordinates.map((L: any) => L.map(PositionToLatLng)),
        {
          color: "black", // Couleur de la bordure du polygone
          fillColor: color, // Couleur de remplissage
          fillOpacity: 0.5, // Opacité de la couleur de remplissage
        }
      );

      // Crée un marqueur basé sur les coordonnées principales de la commune
      const m = getMarker(PositionToLatLng(fm.geometry.coordinates));

      // Met à jour la liste des couches avec le nouveau polygone et marqueur
      this.communes.update((LC) => [...LC, p, m]);
    });

    // Exemple d'appel pour vérifier les données de la commune avec le code postal "31000"
    geoAPI.getCommune('31000').then(console.log);
  }

  /**
   * Nettoie les ressources lors de la destruction du composant.
   */
  ngOnDestroy(): void {
    // Désabonne l'événement de redimensionnement
    this.subResize?.unsubscribe();
  }
}
