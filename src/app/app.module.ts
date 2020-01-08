import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationManagerModule } from './location-manager/location-manager.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { LocationAddComponent } from './location-add/location-add.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ReactiveFormsModule} from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationAddComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AngularOpenlayersModule,
    FormsModule,
    RouterModule.forRoot([...APP_ROUTES]),
    LocationManagerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
