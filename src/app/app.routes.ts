import { ExtraOptions, Routes, PreloadAllModules } from '@angular/router';
import { HomeLocationsComponent } from './location-manager/home/home.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


export const APP_ROUTES: Routes = [
     {
          path: 'home',

          component: DashboardComponent,


     },
     {
          path: 'profil',
          component: ProfileComponent
     },
     {
          path: 'register',
          component: RegisterComponent
     }

]

