import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { MapService } from "../../services/map.service";
import { FormControl } from "@angular/forms";
import { map, catchError, debounceTime, tap } from "rxjs/operators";
import { proj, View } from "openlayers";
import { Subscription, Observable, of } from "rxjs";
import { Location } from "../../models/location";
import { AlertPromise } from "selenium-webdriver";
import { UserService } from "src/app/services/user.service";
import * as L from "leaflet";

@Component({
  selector: "app-location-add",
  templateUrl: "./location-add.component.html",
  styleUrls: ["./location-add.component.css"]
})
export class LocationAddComponent implements OnInit {
  titleCurrentLocation: string = "Position Courante";

  currentLocation: Location;

  isLoading = false;
  isPointingLocation=false;

  foundLocations: Observable<Location[]>;

  constructor(
    private mapService: MapService,
    private userService: UserService,
    private cd:ChangeDetectorRef

  ) {
    this.currentLocation = new Location(11.53,4.38);

    this.longitudePointer = this.currentLocation.longitude;
    this.latitudePointer = this.currentLocation.latitude;
 this.pointLocation();
  }

  actionAdd() {
    this.userService.addLocation(this.currentLocation);
  }
  markerImage = "assets/marker.png";

  ngOnInit() {
    this.configureTownInput();

    this.configureMap();
  }

  pointed: any;
  longitudePointer: number;
  latitudePointer: number;

  townInput: FormControl = new FormControl();
  latInput: FormControl = new FormControl();
  lonInput: FormControl = new FormControl();

  findLocations(city: string) {
    console.log("recherhe de localisation");
    var result = new Map();

    this.isLoading = true;
    this.mapService.citySearch(city).subscribe(data => {
      this.isLoading = false;

      for (var counter in data) {
        var location = data[counter];
        console.log(location);
        if (location["address"]) {
          if (
            city.localeCompare(location["address"]["city"], undefined, {
              sensitivity: "base"
            }) == 0
          ) {
            var current = new Location(location["lon"], location["lat"]);
            current.city = location["address"]["city"];
            current.region = location["address"]["state"];
            current.country = location["address"]["country"];
            current.street = location["address"]["street"];
            result.set(current.country, current);
          }
        }
      }

      var resultArray = new Array();
      for (var loc of result.values()) {
        resultArray.push(loc);
      }
      this.foundLocations = of(resultArray);
    });
  }

  pointLocation() {
    console.log("pointing to location");
    this.currentLocation=new Location(this.longitudePointer, this.latitudePointer);

    this.isPointingLocation=true;
    this.mapService
      .coordinateSearch(this.longitudePointer, this.latitudePointer)
      .subscribe(data => {
        console.log(data);
        const val = data || {};




        this.pointed = val["display_name"];

        if (val["address"]) {

          if (val["address"]["postcode"]) {
            this.currentLocation.postcode = val["address"]["postcode"];
          }
          if (val["address"]["state"]) {
            this.currentLocation.region = val["address"]["state"];
          }

          if (val["address"]["city"]) {
            this.currentLocation.city = val["address"]["city"];
          }

          if (val["address"]["country"]) {
            this.currentLocation.country = val["address"]["country"];
          }

          const street_number = [];
          if (val["address"]["street"]) {
            this.currentLocation.street = val["address"]["street"];
          }

          console.log(this.currentLocation);

          this.isPointingLocation=false;
          //this.cd.detectChanges();
        }
      }


      )  ;
  }

  selectLocation(location) {
    console.log("selecting location");

    this.currentLocation = location;

    console.log(this.currentLocation);
  }

  configureTownInput() {
    this.townInput.valueChanges.pipe(debounceTime(1000)).subscribe(newValue => {
      if (newValue == this.currentLocation.fullName || newValue === "") {
        this.isLoading = false;

        this.map.panTo(new L.LatLng(this.currentLocation.latitude,this.currentLocation.longitude))
     this.marker.setLatLng([this.currentLocation.latitude,this.currentLocation.longitude])
        return;
      }
      this.isLoading = true;
      this.foundLocations = null;

      this.findLocations(newValue);
    });

    this.latInput.valueChanges.pipe(debounceTime(500)).subscribe(newValue => {
      if (newValue == this.currentLocation.latitude) return;
      console.log("changing latitude");
      this.latitudePointer = newValue;
      this.pointLocation();
    });

    this.lonInput.valueChanges.pipe(debounceTime(500)).subscribe(newValue => {

      if ((newValue == this.currentLocation.longitude)) return;
      console.log("changing longitude");
      this.longitudePointer = newValue;
      this.pointLocation();
    });
  }

  map: L.Map;
  ol: any;

  options: any;

  layers: any;

  // get the reference to the map
  onMapReady(map: L.Map) {
    this.map = map;
    this.configureMapClick();
  }

  private marker:L.Layer;
  configureMapClick() {
    var p = this;
    this.marker= L.marker([this.currentLocation.latitude, this.currentLocation.longitude],


      );

    this.map.on("click", function(ev) {

      console.log(ev);
      var latlng = ev.latlng;

      p.marker.setLatLng(latlng);

      p.latitudePointer = latlng.lat;
      p.longitudePointer = latlng.lng;
      console.log(p.longitudePointer);

      p.pointLocation();


    });
    this.map.addLayer(this.marker);
  }



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
        this.currentLocation.latitude,
        this.currentLocation.longitude
      )
    };


    this.layers = [

    ];

   // setTimeout(()=>  {alert("ok");this.map.panTo(new L.LatLng(40.737, -73.923))},2000);
  }
}
