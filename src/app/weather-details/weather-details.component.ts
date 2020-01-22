import { MeteoDay } from './../models/meteoDay';
import { WeatherService } from './../services/weather.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Location } from '../models/location';

@Component({
  selector: 'weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {

  }


  location:Location;


  constructor(private route: ActivatedRoute,private userService:UserService, private weatherService:WeatherService,private router:Router,
    public elementRef: ElementRef,public render : Renderer2

    ) {



    var locationFullName = route.snapshot.params['key'];

    this.location = userService.getLocations().get(locationFullName);
      console.log(this.location);


  }


  public actionBack (){
    this.weatherService.reload=false;
    this.router.navigateByUrl('home/main/'+this.location.key);
  }

  ngOnInit() {
    this.initDay();

  }

  private currentMeteoDay:MeteoDay;




  initDay(){
    this.currentMeteoDay=this.location.forecastMeteoDay[0];
    //document.getElementById(this.currentMeteoDay.dayText).classList.add('currentDateItem');

  }

  public  actionChange(id:string){

      for(var md of this.location.forecastMeteoDay){

        if(md.dayText===id){

          this.currentMeteoDay=md;
          continue;
        }
        console.log(md.dayText)


        document.getElementById(md.dayText).classList.remove('currentDateItem');
      }
    document.getElementById(id).classList.add('currentDateItem');






  }



  loadWeatherInfos(){
    this.weatherService.getMeteoInfos(this.location);
    this.weatherService.reload=true;
  }

}
