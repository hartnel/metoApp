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
  MatDividerModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatIconModule

} from '@angular/material';


import { AngularOpenlayersModule } from 'ngx-openlayers';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocationDetailsComponent } from './location-details/location-details.component';

@NgModule({
  declarations: [ HomeLocationsComponent, LocationDetailsComponent],
  imports: [
    CommonModule, 
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    
    ReactiveFormsModule,
    AngularOpenlayersModule,
    
   RouterModule.forChild(LOCATION_MANAGER_ROUTES)],
   exports:[

HomeLocationsComponent
   ]
})
export class LocationManagerModule { }
