export class MeteoInfo{

temperature:number;



get temperatureText(){


    if(!this.useKelvin){

        return   `${this.temperature-273.15}°C`

    }
    else{
        return  `${this.temperature} F`;
    }
}


useKelvin:boolean=false;



humidity:number;

pressure:number;







}   