
export class MeteoInfo{

hour:number;
weatherState:string;
temperature:{
 min,
 max,
 val
};


humidity='N/A';

pressure:number;






main_icon;



humidity_icon="url('assets/clouds/humidity.png')";




setMainIcon(){

switch(this.weatherState){

    case 'Rain': this.main_icon=RAIN_ICON;break;
    case 'Clouds':this.main_icon=CLOUDY_ICON;break;
    case 'Clear':this.main_icon=SNOW_ICON;break;
    case 'Mist':this.main_icon=WIND_ICON;break;
    default:this.main_icon=WIND_ICON;

}
}


get weatherStateText()


{

    switch(this.weatherState){

        case 'Rain':return 'Pluvieux'
        case 'Clouds':return 'Nuageux';
        case 'Clear':return 'Clair';
        case 'Mist':return 'agité';
        default:return '';

    }

}





}
const SNOW_ICON="url('assets/clouds/snow.png')";
const CLOUDY_ICON="url('assets/clouds/cloudy.png')";
const LIGHTNING_ICON="url('assets/clouds/lightning.png')";
const RAIN_ICON="url('assets/clouds/rain.png')";
const SUN_ICON="url('assets/clouds/sun.png')"
const WIND_ICON="url('assets/clouds/wind.png')"


