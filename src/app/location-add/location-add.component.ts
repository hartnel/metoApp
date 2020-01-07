import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { FormControl } from '@angular/forms';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { proj, View } from 'openlayers';
import { Subscription, Observable, of } from 'rxjs';
import { Location } from '../models/location';
@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  titleCurrentLocation: string = "Position Courante";
  


  currentLocation: Location;
  foundLocations: Observable<Location[]>;

  constructor(private mapService: MapService) {

    this.currentLocation = new Location(11.51667, 3.866);

    this.longitudePointer = this.currentLocation.longitude;
    this.latitudePointer = this.currentLocation.latitude;
    this.pointerLocation();

  }
  markerImage = "assets/marker.png";

  ngOnInit() {
    this.configureTownInput();
  }


  pointed: any;
  longitudePointer: number;
  latitudePointer: number;



  townInput: FormControl = new FormControl();
  latInput:FormControl=new FormControl();
  lonInput:FormControl=new FormControl();








  findLocations(city: string) {


    var result = new Map();

    this.mapService.citySearch(city).subscribe(data => {

      for (var counter in data) {
        var location = data[counter];
        console.log(location);
        if (location['address']) {
          if (city.localeCompare(location['address']['city'], undefined, { sensitivity: 'base' }) == 0) {
            var current = new Location(location['lon'], location['lat']);
            current.city = location['address']['city'];
            current.region = location['address']['state'];
            current.country = location['address']['country'];
            current.street=location['address']['street'];
            result.set(current.country, current);

          }
        }

      }


      var resultArray = new Array();
      for (var loc of result.values()) {
        resultArray.push(loc)
      }
      this.foundLocations = of(resultArray);

    }



    )













  }





  pointerLocation() {


    this.mapService.coordinateSearch(this.longitudePointer, this.latitudePointer)
      .subscribe(data => {
        const val = (data || {})


        this.currentLocation = new Location(this.longitudePointer, this.latitudePointer);


        this.pointed = val['display_name']


        
        if (val['address']['postcode']) {
          this.currentLocation.postcode = val['address']['postcode'];

        }
        if (val['address']['state']) {

          this.currentLocation.region = val['address']['state'];
        }

        if (val['address']['city']) {

          this.currentLocation.city = val['address']['city'];


        }


        if (val['address']['country']) {
          this.currentLocation.country = val['address']['country'];


        }

        const street_number = []
        if (val['address']['street']) {
          this.currentLocation.street = (val['address']['street']);
        }




      })


  }


  selectionLocation(location){
    this.currentLocation=location;
  }


  configureTownInput() {



    this.townInput.valueChanges.pipe(debounceTime(1000)).subscribe(newValue => {


      
      if (newValue instanceof Location) {
        this.currentLocation = newValue;
        
        console.log("Replacement du pointeur");
          
        

      }
      else {
        console.log("recherhe")
        this.findLocations(newValue);
      }



    });

    this.latInput.valueChanges.pipe(debounceTime(1000)).subscribe(
      newValue=>{
      this.latitudePointer=newValue;
        this.pointerLocation();
      }
      )


      
    this.lonInput.valueChanges.pipe(debounceTime(1000)).subscribe(
      newValue=>{
      this.longitudePointer=newValue;
        this.pointerLocation();
      }
      )
  }

  onSingleClick(event) {
    const lonlat = proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')
    this.longitudePointer = lonlat[0]
    this.latitudePointer = lonlat[1]  
    this.pointerLocation();
  }



  opacity: number = 1;
  zoom: number = 14;


  increaseOpacity() {
    this.opacity += 0.1
  }

  decreaseOpacity() {
    this.opacity -= 0.1
  }
  increaseZoom() {
    this.zoom++
  }
  decreaseZoom() {
    this.zoom--
  }

  width: string
  height: string
  titleZoomIn = 'Zoom avant'
  titleZoomOut = 'Zoom arriere'





}
