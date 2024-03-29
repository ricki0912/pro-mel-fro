// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL:'http://localhost:8000', 
    //API_URL:'http://192.168.119.17:8000', 
    WLI_SOCKET_SERVER:'https://www.melendresauditores.com:3000',

  //WLI_SOCKET_SERVER:'http://54.144.140.118:3000',
  //WLI_SOCKET_SERVER:'http://192.168.119.17:3000',

  //WLI_SOCKET_SERVER:'http://localhost:3000',
  X_API_PERU:'https://consulta.api-peru.com',

  X_APISPERU: 'https://dniruc.apisperu.com',
  X_TOKEN_APISPERU: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InJpY2tpLjA5MTJAZ21haWwuY29tIn0.rA2lPgzp3lBMLdgdRhUt1XxbzZa5miaIKk5PZ5c_uUg', 


  YOUTUBE:'https://www.googleapis.com/youtube/v3/search',
  YOUTUBE_TOKEN: 'AIzaSyBBSy1_Qi6o5i8ZkdecHEkYpqs2CayrH40',

  DOMAIN:'localhost'
  
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
