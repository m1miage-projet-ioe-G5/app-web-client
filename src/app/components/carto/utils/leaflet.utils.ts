import { Map as LeafletMap, LatLng } from "leaflet";

/**
 * Recentre la carte Leaflet sur une position donnée.
 *
 * @param leafletMap - Instance de la carte Leaflet à manipuler.
 * @param latlng - Coordonnées (latitude et longitude) pour recentrer la carte.
 */
export function recenter({ leafletMap, latlng }: { leafletMap: LeafletMap, latlng: LatLng }) {

  // Force Leaflet à recalculer les dimensions de la carte
  // (utile dans le cas où la taille de l'élément contenant la carte aurait changé).
  leafletMap.invalidateSize({ animate: false });

  // Recentre la vue de la carte sur les coordonnées spécifiées (latlng)
  // et conserve le zoom actuel (ou passe au zoom par défaut de 15 si non défini).
  leafletMap.setView(latlng, leafletMap.getZoom() ?? 15);
}
