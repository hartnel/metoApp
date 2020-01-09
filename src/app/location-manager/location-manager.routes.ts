import { Routes } from '@angular/router';

import { HomeLocationsComponent } from './home/home.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { Location } from '../models/location';
import { LocationAddComponent } from './location-add/location-add.component';


export const LOCATION_MANAGER_ROUTES: Routes = [

  {

    path: 'locations',
    component: HomeLocationsComponent,
    children:[
        {
            path:'add',
            component:LocationAddComponent,
            

        },

        {
          path:'details/:fullName',
          component:LocationDetailsComponent
        
          
        }


    ],
    runGuardsAndResolvers: 'always'

  }
];