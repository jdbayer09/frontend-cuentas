import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger,AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {DomHandler} from 'primeng/dom';
import { LayoutService } from '../../services/layout/layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MenuService } from '../../services/layout/menu.service';

@Component({
  selector: '[app-menuitem]',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
  animations: [
    trigger('children', [
        state('collapsed', style({
            height: '0'
        })),
        state('expanded', style({
            height: '*'
        })),
        state('hidden', style({
            display: 'none'
        })),
        state('visible', style({
            display: 'block'
        })),
        transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class MenuItemComponent {

  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  @ViewChild('submenu') submenu!: ElementRef;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key: string = "";

  constructor(public layoutService: LayoutService, private cd: ChangeDetectorRef,private appSidebar: SidebarComponent, public router: Router, private menuService: MenuService) {
      this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
          Promise.resolve(null).then(() => {
              if (value.routeEvent) {
                  this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
              }
              else {
                  if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
                      this.active = false;
                  }
              }
          });
      });

      this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
          this.active = false;
      });

      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(params => {
              if (this.isSlim || this.isHorizontal || this.isCompact) {
                  this.active = false;
              }
              else {
                  if (this.item.routerLink) {
                      this.updateActiveStateFromRoute();
                  }
              }
          });
  }

  ngOnInit() {
      this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

      if (!(this.isSlim || this.isHorizontal || this.isCompact) && this.item.routerLink) {
          this.updateActiveStateFromRoute();
      }
  }

  ngAfterViewChecked() {
      if (this.root && this.active && this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isCompact())) {
          this.calculatePosition(this.submenu?.nativeElement, this.submenu?.nativeElement.parentElement);
      }
  }

  updateActiveStateFromRoute() {
      let activeRoute = this.router.isActive(this.item.routerLink[0], (<IsActiveMatchOptions> this.item.routerLinkActiveOptions || { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }));

      if (activeRoute) {
          this.menuService.onMenuStateChange({key: this.key, routeEvent: true});
      }
  }

  onSubmenuAnimated(event: AnimationEvent) {
      if (event.toState === 'visible' && this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isCompact())) {
          const el = <HTMLUListElement> event.element;
          const elParent = <HTMLUListElement> el.parentElement;
          this.calculatePosition(el, elParent);
      }
  }

  calculatePosition(overlay: HTMLElement, target: HTMLElement) {
      if (overlay) {
          const { left, top } = target.getBoundingClientRect();
          const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
          const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
          const scrollbarWidth = DomHandler.calculateScrollbarWidth();
          // reset
          overlay.style.top = '';
          overlay.style.left = '';

          if (this.layoutService.isHorizontal()) {
              const width = left + oWidth + scrollbarWidth;
              overlay.style.left = vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`;
          } else if ( this.layoutService.isSlim() || this.layoutService.isCompact()) {
              const height = top + oHeight;
              overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
          }
      }
  }

  itemClick(event: Event) {
      // avoid processing disabled items
      if (this.item.disabled) {
          event.preventDefault();
          return;
      }

      // navigate with hover
      if (this.root && this.isSlim || this.isHorizontal || this.isCompact) {
          this.layoutService.state.menuHoverActive = !this.layoutService.state.menuHoverActive;
      }

      // execute command
      if (this.item.command) {
          this.item.command({ originalEvent: event, item: this.item });
      }

      // toggle active state
      if (this.item.items) {
          this.active = !this.active;

          if (this.root && this.active && (this.isSlim || this.isHorizontal || this.isCompact)) {
              this.layoutService.onOverlaySubmenuOpen();
          }
      }
      else {
          if (this.layoutService.isMobile()) {
              this.layoutService.state.staticMenuMobileActive = false;
          }

          if (this.isSlim || this.isHorizontal || this.isCompact) {
              this.menuService.reset();
              this.layoutService.state.menuHoverActive = false;
          }
      }

      this.menuService.onMenuStateChange({key: this.key});
  }

  onMouseEnter() {
      // activate item on hover
      if (this.root && (this.isSlim || this.isHorizontal || this.isCompact) && this.layoutService.isDesktop()) {
          if (this.layoutService.state.menuHoverActive) {
              this.active = true;
              this.menuService.onMenuStateChange({key: this.key});
          }
      }
  }

  get submenuAnimation() {
      if (this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim() || this.layoutService.isCompact()))
          return this.active ? 'visible' : 'hidden';
      else
          return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
  }

  get isHorizontal() {
      return this.layoutService.isHorizontal();
  }

  get isSlim() {
      return this.layoutService.isSlim();
  }

  get isCompact() {
      return this.layoutService.isCompact();
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
      return this.active && !this.root;
  }

  ngOnDestroy() {
      if (this.menuSourceSubscription) {
          this.menuSourceSubscription.unsubscribe();
      }

      if (this.menuResetSubscription) {
          this.menuResetSubscription.unsubscribe();
      }
  }
}
