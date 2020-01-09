// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,


  

  owmUrl: 'https://cors-anywhere.herokuapp.com/'+'http://api.openweathermap.org/data/2.5',
  owmKey:'4ce43072e4701bde21707be99a0d2632',


  wikiUrl:'https://cors-anywhere.herokuapp.com/'+'http://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=600&titles=',

  osmDirectUrl: 'https://cors-anywhere.herokuapp.com/'+ 'https://nominatim.openstreetmap.org/search?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&q={city}&type=city&addressdetails=1',
  osmReverseUrl:'https://cors-anywhere.herokuapp.com/'+'https://nominatim.openstreetmap.org/reverse?key=iTzWSiYpGxDvhATNtSrqx5gDcnMOkntL&format=json&addressdetails=1&lat={lat}&lon={lon}'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
