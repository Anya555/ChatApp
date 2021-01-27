// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3001',
  firebaseConfig: {
    apiKey: 'AIzaSyDxPosOjJrI7m8oSoeCv4cZ84jQ2PYoCLc',
    authDomain: 'chatapp-6098c.firebaseapp.com',
    projectId: 'chatapp-6098c',
    storageBucket: 'chatapp-6098c.appspot.com',
    messagingSenderId: '663367919598',
    appId: '1:663367919598:web:5dc13c4aae46330c90d0ff',
    measurementId: 'G-G4J593ZMYW',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
