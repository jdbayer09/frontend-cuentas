import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  onMenuButtonClick() {
      this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
      this.layoutService.showRightMenu();
  }

  onSearchClick() {
      this.layoutService.toggleSearchBar();
  }

  onRightMenuClick() {
      this.layoutService.showRightMenu();
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
