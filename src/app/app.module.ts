import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import {dbConfig} from '../db/db.conf';
import { UserService } from 'src/services/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
