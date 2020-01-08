import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'home-locations',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeLocationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  testLocations: Location[] =

    [
      new Location(1544,454),
      new Location(1392,1290),
      new Location(2302,213),




    ]








}


  
  


