import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';
import { MeteoInfo } from '../models/meteoInfo';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http: HttpClient) { }



  getCurrentWeather(location: Location) {
    console.log("Recherche des infos de météo");
    return this.http.get(`${environment.owmUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`).subscribe(

      data => {


        
        var cw = location.currentWeather;

        cw.date = new Date();
        cw.humidity = data['main']['humidty'];
        cw.pressure = data['main']['pressure'];
        cw.temperature = {
            
          min:Math.floor(data['main']['temp_min']-272.15),
          max:  Math.floor(data['main']['temp_max']-272.15),
          val: Math.floor(data['main']['temp']-272.15),}


      }

    )


  }





  getForecastWeather(location: Location) {
    return this.http.get(`${environment.owmUrl}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`)
      .subscribe(


        data => {
          var infos = new Map();
          var listInfos = data['list'];
          for (var counter in listInfos) {
            
            var key=new Date(listInfos[counter]['dt_txt']).getDate();
            if(infos.has(key))continue;
            else {
              
              infos.set(key,listInfos[counter])
            
            }  

          }

          var fw=location.forecastWeather
          for(var info of infos.values()){
            var w=new MeteoInfo();
            w.date=new Date(info['dt_txt']);
            w.humidity=info['main']['humidity'];
            w.pressure=info['main']['pressure'];
            w.temperature = {
              min: Math.floor (info['main']['temp_min']-272.15),
              max: Math.floor(info['main']['temp_max']-272.15),
              val:  Math.floor(info['main']['temp']-272.15),
            
            
            
            }

            fw.push(w);
            

            
          
          
          }

          console.log("liste des infos");
          console.log(location.forecastWeather);
















        }
      )


      ;
  }
}
