



import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, provideRoutes } from '@angular/router';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';
import { proj, View, color } from 'openlayers';
import { TownImageService } from 'src/app/services/town-image.service';
import { WeatherService } from 'src/app/services/weather.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as L from "leaflet";
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

  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router, private townImageService: TownImageService, private weatherService: WeatherService) {
    console.log("DETAIL DE LOCALISATION");
    var locationFullName = route.snapshot.params['key'];

    console.log(locationFullName);
    this.location = userService.getLocations().get(locationFullName);
console.log(this.userService.getLocations());
    console.log(this.location);



  }




  markerImage = "assets/marker.png";


  location: Location;



  actionMeteo() {
    this.router.navigateByUrl('home/main/'+this.location.key);

  }
  actionDelete() {

    if(!confirm('Voulez vraiment supprimer cette localisation?')) return;
    this.router.navigateByUrl('locations/add');
    this.userService.removeLocation(this.location);

  }

  ngOnInit() {


    console.log("loca");
    console.log(this.location);
    this.townImageService.getImage(this.location).subscribe(data=>{})

    this.configureMap();
  }




  map: L.Map;
  ol: any;

  options: any;

  layers: any;


  configureMap() {
    this.options = {
      layers: [
        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "..."
        })
      ],
      zoom: 8,
      center: L.latLng(
        this.location.latitude,
        this.location.longitude
      ),
    };

    }




  onMapReady(map: L.Map) {
    this.map = map;
    L.marker([this.location.latitude, this.location.longitude]).addTo(this.map);
  }


}
