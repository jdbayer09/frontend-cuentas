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
              icon: 'pi pi-home',
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
              label: 'Apps',
              icon: 'pi pi-th-large',
              items: [
                  {
                      label: 'Blog',
                      icon: 'pi pi-fw pi-comment',
                      items: [
                          {
                              label: 'List',
                              icon: 'pi pi-fw pi-image',
                              routerLink: ['/apps/blog/list']
                          },
                          {
                              label: 'Detail',
                              icon: 'pi pi-fw pi-list',
                              routerLink: ['/apps/blog/detail']
                          },
                          {
                              label: 'Edit',
                              icon: 'pi pi-fw pi-pencil',
                              routerLink: ['/apps/blog/edit']
                          }
                      ]
                  },
                  {
                      label: 'Calendar',
                      icon: 'pi pi-fw pi-calendar',
                      routerLink: ['/apps/calendar']
                  },
                  {
                      label: 'Chat',
                      icon: 'pi pi-fw pi-comments',
                      routerLink: ['/apps/chat']
                  },
                  {
                      label: 'Mail',
                      icon: 'pi pi-fw pi-envelope',
                      items: [
                          {
                              label: 'Inbox',
                              icon: 'pi pi-fw pi-inbox',
                              routerLink: ['/apps/mail/inbox']
                          },
                          {
                              label: 'Compose',
                              icon: 'pi pi-fw pi-pencil',
                              routerLink: ['/apps/mail/compose']
                          },
                          {
                              label: 'Detail',
                              icon: 'pi pi-fw pi-comment',
                              routerLink: ['/apps/mail/detail/1000']
                          }
                      ]
                  },
                  {
                      label: 'Task List',
                      icon: 'pi pi-fw pi-check-square',
                      routerLink: ['/apps/tasklist']
                  }
              ]
          },
          { separator: true },
          {
              label: 'Start',
              icon: 'pi pi-fw pi-download',
              items: [
                  {
                      label: 'Buy Now',
                      icon: 'pi pi-fw pi-shopping-cart',
                      url: ['https://www.primefaces.org/store']
                  },
                  {
                      label: 'Documentation',
                      icon: 'pi pi-fw pi-info-circle',
                      routerLink: ['/documentation']
                  }
              ]
          }
      ]);
  }
}
