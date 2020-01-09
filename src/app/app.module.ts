import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';



import { LocationManagerModule } from './location-manager/location-manager.module';




import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';

import { MatCardModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { DashboardComponent } from './dashboard/dashboard.component';
import {dbModule} from "./db/db.module";


@NgModule({
  declarations: [
    AppComponent,
  DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    
    
    RouterModule.forRoot([...APP_ROUTES]),
    LocationManagerModule,
    dbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
