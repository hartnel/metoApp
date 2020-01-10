import { Component, OnInit, Input } from '@angular/core';
import { MeteoInfo } from '../models/meteoInfo';
import { MeteoDay } from '../models/meteoDay';

@Component({
  selector: 'app-meteoday',
  templateUrl: './meteoday.component.html',
  styleUrls: ['./meteoday.component.css']
})
export class MeteodayComponent implements OnInit {

  @Input()
  stateComponent: boolean;
  @Input()
  city : string;
  @Input()
  meteoinfo: MeteoDay;
  curent:any
  constructor() { 
    
  }

  update(hour : MeteoInfo){
    this.curent = this.meteoinfo.meteoInfos.filter(elt => elt.hour === hour.hour)[0];
    
  }

  ngOnInit() {
    console.log(this.stateComponent)
    this.update(this.meteoinfo.meteoInfos[0]);
  
  }

}
