import { Routes } from '@angular/router';

import { HomeLocationsComponent } from './home/home.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { Location } from '../models/location';
import { LocationAddComponent } from './location-add/location-add.component';
import { UserService } from '../services/user.service';


export const LOCATION_MANAGER_ROUTES: Routes = [

  {

    path: 'locations',
    component: HomeLocationsComponent,
    canActivate:[UserService],
    children: [

      {
        path: '',
        redirectTo:'add',
        pathMatch:'full'

      }


      ,


      {


        path: 'add',
        component: LocationAddComponent,


      },

      {
        path: 'details/:key',
        component: LocationDetailsComponent


      }


    ],
    runGuardsAndResolvers: 'always'

  }
];
