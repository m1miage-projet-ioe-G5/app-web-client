import { Routes } from '@angular/router';
import { CartoComponent } from './components/carto/carto.component';
import { ListsComponent } from './components/lists/lists.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import {UserComponent} from "./components/user/user.component";
export const routes: Routes = [
    { path: 'presentation', title: "Présentation", component: PresentationComponent },
    { path: 'leaflet', title: "Cartographie avec les leaflet", component: CartoComponent },
    { path: 'lists', title: "Listes", component: ListsComponent },
    { path: 'users', component: UserComponent },
    { path: '**', redirectTo: '/leaflet' }
];
