// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // BASE_URL: 'https://finnbet.com/COFFEE',
  // LOTTO_URL: 'https://finnbet.com/coffee-beans',
  // FINNBET:'https://finnbet.com'

  // BASE_URL: '172.19.93.12:8080/COFFEE',
  // LOTTO_URL: '172.19.93.12:8080/coffee-beans',
  // FINNBET: '172.19.93.12:8080'

  // BASE_URL: 'http://baiwa.ddns.net:9440/COFFEE',
  // LOTTO_URL: 'http://baiwa.ddns.net:9440/coffee-beans',

  BASE_URL: 'http://localhost:8080/COFFEE',
  LOTTO_URL: 'http://localhost:8082/coffee-beans',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
