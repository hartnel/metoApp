import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';
import { MeteoInfo } from '../models/meteoInfo';
import { MeteoDay } from '../models/meteoDay';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http: HttpClient) { }


 
  



  getCurrentWeather(location: Location) {
    console.log("Recherche des infos de météo");
    return this.http.get(`${environment.owmUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`).subscribe(
    
    data => {



      var meteoInfo = new MeteoInfo();

      meteoInfo.hour = new Date(data['dt_txt']).getHours();
      meteoInfo.weatherState=data['weather'][0]['main'];
      meteoInfo.setMainIcon();
      meteoInfo.humidity = data['main']['humidty'];
      meteoInfo.pressure = data['main']['pressure'];
      meteoInfo.temperature = {

        min: Math.floor(data['main']['temp_min'] - 272.15),
        max: Math.floor(data['main']['temp_max'] - 272.15),
        val: Math.floor(data['main']['temp'] - 272.15),
      }



      

      location.currentMeteoDay.meteoInfos.push(meteoInfo);

      location.infosAvailable=true;

     





  }); }





  getMeteoInfos(location: Location) {
    return this.http.get(`${environment.owmUrl}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`)
      .subscribe(


        data => {
          console.log("Jour courante" +new Date().getHours());
          var meteoDays = new Map<Number, MeteoDay>();


          var listInfos = data['list'];

          for (var counter in listInfos) {
            var info = listInfos[counter];
            var key = new Date(info['dt_txt']).getDay();

            
            if (!meteoDays.has(key)) {
              var md = new MeteoDay();
              md.date = new Date(info['dt_txt']);
              meteoDays.set(key, md);

            }

            
            if(![3,9,15,21].includes ( new Date(info['dt_txt']).getHours())) continue;
            
            var meteoInfo = new MeteoInfo();


            meteoInfo.hour = new Date(info['dt_txt']).getHours();
            
            meteoInfo.weatherState=info['weather'][0]['main'];
            meteoInfo.setMainIcon();
            meteoInfo.humidity = info['main']['humidity'];
            meteoInfo.pressure = info['main']['pressure'];
            meteoInfo.temperature = {
              min: Math.floor(info['main']['temp_min'] - 272.15),
              max: Math.floor(info['main']['temp_max'] - 272.15),
              val: Math.floor(info['main']['temp'] - 272.15),
            }
            meteoDays.get(key).meteoInfos.push(meteoInfo);


          }
          var currentDay=new Date().getDay();
          for (var date of meteoDays.keys()) {
            if (date ==currentDay) {
              location.currentMeteoDay = meteoDays.get(date);
            }
            else {
              location.forecastMeteoDay.push(meteoDays.get(date));

            }
          }


          this.getCurrentWeather(location);



          console.log(location);

        }










      )



      }
}
