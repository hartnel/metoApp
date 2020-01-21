import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Location } from '../models/location';
import { ObjectEvent } from 'openlayers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //test
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  testLocations:Location[]=new Array<Location>();
    //endTEST
  constructor(private userService:UserService) { 

    let location=new Location(11.53,4.38);
    location.city="Yaoundé";
    location.country="Douala";
    location.region="Centre";
    
    for(let i=0;i<6;i++){
      var current=new Location(1,1);
      Object.assign(current,location);    this.testLocations.push
      this.testLocations.push(location);
    }

  }
  
  ngOnInit() {
  }

}
