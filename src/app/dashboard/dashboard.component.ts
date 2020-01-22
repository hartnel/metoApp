import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Location } from '../models/location';
import { ObjectEvent } from 'openlayers';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import {weatherSlideInAnimation} from '../animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [weatherSlideInAnimation]
})
export class DashboardComponent implements OnInit {




    userLocations:Location[]=new Array<Location>();


  constructor(private userService:UserService, private route:ActivatedRoute, private router :Router) {

    if( this.userService.getLocations().size==0 ){
      this.router.navigateByUrl('locations/add');
    }
    console.log("taille : " +this.userService.getLocations().size);
    console.log(this.userService.getLocations())
    if(!this.route.firstChild){
      var location=this.userService.getLocations().values().next().value;

      this.router.navigateByUrl('home/main/'+location.key);
    }

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


  ngOnInit() {
  }

}

