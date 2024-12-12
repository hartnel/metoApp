import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Location } from '../models/location';
import {fadeAnimation} from '../animations';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  animations: [fadeAnimation],
})
export class WeatherCardComponent implements OnInit {


  location:Location

  constructor(private route: ActivatedRoute,private userService:UserService, private weatherService:WeatherService,private router:Router) {

    var locationFullName = route.snapshot.params['key'];

    this.location = userService.getLocations().get(locationFullName);


  }



  actionToDetails(){
    this.weatherService.reload=false;
    this.router.navigateByUrl('home/details/'+this.location.key);
  }




  ngOnInit() {





  this.loadWeatherInfos();


  }





  loadWeatherInfos(){
    this.weatherService.getMeteoInfos(this.location);
    this.weatherService.reload=true;
  }

}
