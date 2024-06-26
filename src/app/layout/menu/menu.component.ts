import { Component, OnInit, computed, signal } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: ''
})
export class MenuComponent implements OnInit {

  private _model = signal<any[]>([]);

  model = computed(() => this._model())

  ngOnInit() {

      this._model.set([
          {
              label: 'Dashboard',
              items: [
                  {
                      label: 'Dashboard',
                      icon: 'pi pi-fw pi-home',
                      routerLink: ['/z/dashboard']
                  }
              ]
          },
          { separator: true },
          {
              label: 'CUENTAS',
              icon: 'pi pi-th-large',
              items: [
                  {
                    label: 'Ingresos',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/z/cash-receipts']
                  },
                  {
                    label: 'Gastos',
                    icon: 'pi pi-fw pi-euro',
                    routerLink: ['/z/costs']
                  },
                  {
                      label: 'Categorías',
                      icon: 'pi pi-fw pi-book',
                      routerLink: ['/z/categories']
                  },
                  {
                    label: 'Métodos de Pago',
                    icon: 'pi pi-fw pi-money-bill',
                    routerLink: ['/z/payment-methods']
                  }
              ]
          },
          { separator: true },
          {
              label: 'Ajustes',
              items: [
                  {
                      label: 'Ajustes de Cuenta',
                      icon: 'pi pi-fw pi-user',
                      routerLink: ['/z/profile']
                  }
              ]
          }
      ]);
  }
}
