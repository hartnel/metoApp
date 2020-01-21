import { MeteoInfo } from './meteoInfo';

export class MeteoDay {


    get current(): MeteoInfo {

        var index = this.meteoInfos.length - 1;
        return this.meteoInfos[index];
    }




    date: Date;

    meteoInfos: MeteoInfo[] = new Array<MeteoInfo>();

    get todayForecast(): MeteoInfo[] {


        var index = this.meteoInfos.length - 1;
        return this.meteoInfos.slice(0, index);
    }








    











}