import {ExtraOptions, Routes, PreloadAllModules} from '@angular/router';
import { HomeLocationsComponent } from './location-manager/home/home.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const APP_ROUTES: Routes = [
     {path:'dashboard',
     component:DashboardComponent

     }
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
}
