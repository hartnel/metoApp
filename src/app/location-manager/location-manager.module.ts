import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { LOCATION_MANAGER_ROUTES } from './location-manager.routes';
import { HomeLocationsComponent } from './home/home.component';

import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  
  MatDividerModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatIconModule

} from '@angular/material';


import { AngularOpenlayersModule } from 'ngx-openlayers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocationDetailsComponent } from './location-details/location-details.component';



import { UserService } from '../services/user.service';
import { LocationAddComponent } from './location-add/location-add.component';
import { MapService } from '../services/map.service';
import { TownImageService } from '../services/town-image.service';
import { LocationService } from '../services/location.service';



@NgModule({
  declarations: [HomeLocationsComponent, LocationDetailsComponent,LocationAddComponent],
  imports: [
    CommonModule,
    
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AngularOpenlayersModule,

    RouterModule.forChild(LOCATION_MANAGER_ROUTES)],
  providers: [UserService,MapService,TownImageService , LocationService],
  exports: [

    HomeLocationsComponent
  ]
})
export class LocationManagerModule { }
