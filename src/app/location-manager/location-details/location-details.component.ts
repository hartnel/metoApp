



import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
  
    Object.assign(this.location,this.router.getCurrentNavigation().extras.state);
      

  }





  location:Location=new Location(1,2);
  ngOnInit() {

   
  }

}
