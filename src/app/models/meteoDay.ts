import { MeteoInfo } from './meteoInfo';

export class MeteoDay {


    get current(): MeteoInfo {

        var index = this.meteoInfos.length - 1;
        return this.meteoInfos[index];
    }




    date: Date;


    get dateText(){
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



      return this.date.toLocaleDateString("fr-FR", options);
    }

    get dayText(){
      var options = { weekday: 'long'};
      return this.date.toLocaleDateString("fr-FR", options);

    }


    get simpleDate(){
      var options={ year: 'numeric', month: 'long', day: 'numeric' };
      return this.date.toLocaleDateString("fr-FR", options);
    }




    meteoInfos: MeteoInfo[] = new Array<MeteoInfo>();

    get todayForecast(): MeteoInfo[] {


        var index = this.meteoInfos.length - 1;
        return this.meteoInfos.slice(0, index);
    }




















}
