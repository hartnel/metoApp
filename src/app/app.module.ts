import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';



import { LocationManagerModule } from './location-manager/location-manager.module';


import { APP_ROUTES} from './app.routes';
import { LocationAddComponent } from './location-manager/location-add/location-add.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { FlexLayoutModule } from '@angular/flex-layout';


import {ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { MatToolbarModule, MatSelectModule, MatCardModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatDatepickerModule,MatNativeDateModule,MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatSidenavModule, MatTabsModule } from '@angular/material';


import { AngularOpenlayersModule } from 'ngx-openlayers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import {dbModule} from "./db/db.module";
import { UserService } from './services/user.service';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherService } from './services/weather.service';
import { RegisterComponent } from './register/register.component';
import { MeteoCardComponent } from 'VUESYEF/src/src/app/meteo-card/meteo-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarousselItemDirective } from './caroussel-item.directive';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';



@NgModule({
  declarations: [
    AppComponent,
    MeteoCardComponent,


  DashboardComponent,

    DashboardComponent,
    ProfileComponent,
    WeatherCardComponent,
    RegisterComponent,
    NavBarComponent,
    CarousselItemDirective,
    WeatherDetailsComponent

  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,

    MatTabsModule,
    MatListModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,


    RouterModule.forRoot([...APP_ROUTES]),
    LocationManagerModule,
    dbModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
