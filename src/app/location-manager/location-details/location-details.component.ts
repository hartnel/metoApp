



import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, provideRoutes } from '@angular/router';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';
import { proj, View, color } from 'openlayers';
import { TownImageService } from 'src/app/services/town-image.service';
import { WeatherService } from 'src/app/services/weather.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
  animations: [

    trigger('simpleFadeAnimation', [


      state('in', style({ opacity: 1 })),


      transition(':enter', [
        style({ opacity: 0 }),

        animate(2500)
      ]),


      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ]
})

export class LocationDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private townImageService: TownImageService, private weatherService: WeatherService) {
    
    var locationFullName = route.snapshot.params['fullName'];
    this.location = userService.getLocations().get(locationFullName);
    
    
  }




  markerImage = "assets/marker.png";


  location: Location;



  actionMeteo() {
    this.weatherService.getCurrentWeather(this.location);

  }
  actionDelete() {
    this.userService.removeLocation(this.location);

  }

  ngOnInit() {

    this.townImageService.getImage(this.location).subscribe(data=>{})
  }

}
