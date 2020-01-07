import { Routes } from '@angular/router';
import { LocationAddComponent } from '../location-add/location-add.component';
import { HomeLocationsComponent } from './home/home.component';


export const LOCATION_MANAGER_ROUTES: Routes = [

  {

    path: 'locations',
    component: HomeLocationsComponent,
    children:[
        {
            path:'add',
            component:LocationAddComponent,
            

        }


    ]

  }
];