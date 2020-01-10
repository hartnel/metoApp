import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { MatCardModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatDatepickerModule,MatNativeDateModule,MatListModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';

//import {MatCardModule} from '@angular/material/card'; 
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import {dbModule} from "./db/db.module";
import { UserService } from './services/user.service';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherService } from './services/weather.service';
import { WeatherTodayComponent } from './weather-today/weather-today.component';
   

@NgModule({
  declarations: [
    AppComponent,

  DashboardComponent,

    DashboardComponent,
    ProfileComponent,
    WeatherCardComponent,
    WeatherTodayComponent  

  ],
  imports: [
    NgbModule,  
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
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
    
    
    RouterModule.forRoot([...APP_ROUTES]),
    LocationManagerModule,
    dbModule
  ],
  providers: [UserService,WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
     