import { UserService } from 'src/app/services/user.service';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ExtraOptions, Routes, PreloadAllModules } from '@angular/router';
import { HomeLocationsComponent } from './location-manager/home/home.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


export const APP_ROUTES: Routes = [

{
path:'',
redirectTo:'home',
pathMatch:'full',

},

  {

          path: 'home',
          canActivate:[UserService],
          component: DashboardComponent,
          children: [



            {
              path: 'main/:key',
              component: WeatherCardComponent,
              data: {animation:"WeatherCard"}


            },

            {
              path: 'details/:key',
              component: WeatherDetailsComponent,
              data: {animation:"WeatherDetails"}


            },
          ]

     },
     {
          path: 'profil',
          canActivate:[UserService],
          component: ProfileComponent
     },
     {
          path: 'register',
          component: RegisterComponent
     }

]

