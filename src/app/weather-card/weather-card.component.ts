import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Location } from '../models/location';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  location:Location

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {  
    
    
  
    

  this.loadWeatherInfos();
    

  }




  loadWeatherInfos(){
    this.weatherService.getMeteoInfos(this.location);
  }

}
