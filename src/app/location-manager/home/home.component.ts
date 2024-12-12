import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-locations',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeLocationsComponent implements OnInit {


  constructor(private userService: UserService,private router :Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };


  }


  scrollToElement($element): void {
    return;
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }




  ngOnInit() {
  }



    goToLocation(){
    }




}






