import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { FormControl } from '@angular/forms';
import { map, catchError, debounceTime, tap } from 'rxjs/operators';
import { proj, View } from 'openlayers';
import { Subscription, Observable, of } from 'rxjs';
import { Location } from '../../models/location';
import { AlertPromise } from 'selenium-webdriver';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
  titleCurrentLocation: string = "Position Courante";



  currentLocation: Location;

  
  isLoading = false;


  foundLocations: Observable<Location[]>;

  constructor(private mapService: MapService,private userService :UserService) {

    this.currentLocation = new Location(2.3514992, 48.85);

    this.longitudePointer = this.currentLocation.longitude;
    this.latitudePointer = this.currentLocation.latitude;
    this.pointLocation();

    

  }







  map:any;
  ol:any;



  actionAdd(){

      this.userService.addLocation(this.currentLocation);
  }









  markerImage = "assets/marker.png";

  ngOnInit() {
    this.configureTownInput();

    
  }


  pointed: any;
  longitudePointer: number;
  latitudePointer: number;



  townInput: FormControl = new FormControl();
  latInput: FormControl = new FormControl();
  lonInput: FormControl = new FormControl();








  findLocations(city: string) {

    console.log("recherhe de localisation")
    var result = new Map();

    this.isLoading = true;
    this.mapService.citySearch(city).subscribe(data => {

      this.isLoading = false;

      for (var counter in data) {
        var location = data[counter];
        console.log(location);
        if (location['address']) {
          if (city.localeCompare(location['address']['city'], undefined, { sensitivity: 'base' }) == 0 
          
          
                    
          
          
          ) {
            var current = new Location(location['lon'], location['lat']);
            current.city = location['address']['city'];
            current.region = location['address']['state'];
            current.country = location['address']['country'];
            current.street = location['address']['street'];
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





  pointLocation() {


    console.log("pointing to location")

    this.mapService.coordinateSearch(this.longitudePointer, this.latitudePointer)
      .subscribe(data => {
        const val = (data || {})


        this.currentLocation.longitude=this.longitudePointer;
        this.currentLocation.latitude=this.latitudePointer;



        this.pointed = val['display_name']

        if(val['address']){

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
      }



        
      })

    


  }


  selectLocation(location) {
    console.log("selecting location");
    
    this.currentLocation = location;

    console.log(this.currentLocation);

    
  }


  configureTownInput() {



    this.townInput.valueChanges.pipe(debounceTime(1000)).subscribe(newValue => {
      
          if(newValue==this.currentLocation.fullName)return;

      this.isLoading = true;
      this.foundLocations = null;


      this.findLocations(newValue);




    });
    
    this.latInput.valueChanges.pipe(debounceTime(500)).subscribe(
      newValue => {
        
        if(newValue==this.currentLocation.latitude) return;
        console.log("changing latitude")
        this.latitudePointer = newValue;
        this.pointLocation();
      }
    )



    this.lonInput.valueChanges.pipe(debounceTime(500)).subscribe(
      newValue => {
        
        if(newValue=this.currentLocation.longitude) return;
        console.log("changing longitude")
        this.longitudePointer = newValue;
        this.pointLocation();
      }
    )
  }

  onSingleClick(event) {
    console.log(event.coordinate);
    const lonlat = proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')
    this.longitudePointer = lonlat[0]
    this.latitudePointer = lonlat[1]
    this.pointLocation();
  
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
