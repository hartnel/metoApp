



import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, provideRoutes } from '@angular/router';
import { Location } from 'src/app/models/location';
import { UserService } from 'src/app/services/user.service';
import { proj, View } from 'openlayers';
import { TownImageService } from 'src/app/services/town-image.service';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
  
})

export class LocationDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService:UserService,private router: Router,private townImageService:TownImageService) {
  
    var locationFullName=route.snapshot.params['fullName'];
    this.location=userService.getLocations().get(locationFullName);
    
  }



  townImage:string;
  markerImage = "assets/marker.png";


  location:Location;



  actionMeteo(){
    
  }
  actionDelete(){
    this.userService.removeLocation(this.location);
    
  }

  ngOnInit() {

    this.townImageService.getImage(this.location).then(data=>this.townImage= "url('"+data+"')");
    
    
   
  }

}
