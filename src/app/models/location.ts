import { MeteoInfo } from './meteoInfo';

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

currentWeather:MeteoInfo=new MeteoInfo();
forecastWeather:MeteoInfo[]=new Array<MeteoInfo>();





get fullName(){
    if(this.city==null||this.city==undefined){

        return (this.country+", "+this.region);
    }  
    return this.city+" ( "+this.country +" "+this.region+")";

}

get key(){
    return this.city+"-"+this.country+"-"+this.region;

}
set fullName(fullName:string){}

constructor(longitude:number,latitude:number){
    this.longitude=longitude;
    this.latitude=latitude;
}























    
}


