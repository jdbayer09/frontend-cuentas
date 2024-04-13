import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: ''
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  onMenuButtonClick() {
      this.layoutService.onMenuToggle();
  }

  get logo() {
    const logo =
        this.layoutService.config().menuTheme === 'white' ||
        this.layoutService.config().menuTheme === 'orange'
            ? 'dark'
            : 'white';
    return logo;
  }
}
