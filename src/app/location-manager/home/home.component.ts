import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-locations',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeLocationsComponent implements OnInit {

  constructor(private userService: UserService) {

    this.userLocations = userService.getLocations();

  }


  userLocations: Location[];

  ngOnInit() {
  }



    





}






