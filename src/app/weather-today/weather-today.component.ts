import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../models/location';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.css']
})
export class WeatherTodayComponent implements OnInit {

  @Input()
  location: Location;
  /*


  */

  constructor() { }

  ngOnInit() {
    //this.location.name =
  }

}
