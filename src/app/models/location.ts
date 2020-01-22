import { MeteoInfo } from './meteoInfo';
import { MeteoDay } from './meteoDay';

export class Location{
id:number;
name:string;
country:string;
region:string;
city:string;
longitude:number;
latitude:number;
postcode:string;
street:string;





 toTrunc(value,n){
 var x=(value.toString()+".0").split(".");
  return parseFloat(x[0]+"."+x[1].substr(0,n));
}



get truncateLon(){
  return this.toTrunc(this.longitude,4);
}
get truncateLat(){
  return this.toTrunc(this.latitude,4);

}











currentMeteoDay:MeteoDay=new MeteoDay();
forecastMeteoDay:MeteoDay[]=new Array<MeteoDay>();


infosAvailable=false;


get fullName(){

  if(!this.country) return '';

    if(this.city==null||this.city==undefined){

        return (this.country+", "+this.region);
    }
    return this.city+" ( "+this.country +" ,"+this.region+")";

}

get key(){
    return this.city+"-"+this.country+"-"+this.region;

}


generateKey(){
  return this.city+"-"+this.country+"-"+this.region;
}



set fullName(fullName:string){}

constructor(longitude:number,latitude:number){
    this.longitude=longitude;
    this.latitude=latitude;
}
























}


