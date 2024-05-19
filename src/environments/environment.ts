// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:8081/cuentas/api',
  public: {
    tittle: 'CUENTAS PERSONALES',
    info: 'Una aplicación de gestión de cuentas personales intuitiva y segura que ayuda a los usuarios a administrar sus finanzas de manera eficiente. Permite realizar seguimiento de gastos, presupuestos, ahorros y transacciones, ofreciendo herramientas para un control total y una planificación financiera efectiva, todo en un solo lugar.'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
