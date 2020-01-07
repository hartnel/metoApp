import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
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
  MatProgressSpinnerModule

} from '@angular/material';


import { AngularOpenlayersModule } from 'ngx-openlayers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidebarComponent, HomeLocationsComponent],
  imports: [
    CommonModule, 
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AngularOpenlayersModule,
    
   RouterModule.forChild(LOCATION_MANAGER_ROUTES)],
   exports:[
SidebarComponent,
HomeLocationsComponent
   ]
})
export class LocationManagerModule { }
