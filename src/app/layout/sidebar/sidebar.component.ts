import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ''
})
export class SidebarComponent implements OnDestroy {
  timeout: any = null;
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  constructor(public layoutService: LayoutService, public el: ElementRef) {}

  get logoColor() {
    return 'dark';
  }
  onMouseEnter() {
      if (!this.layoutService.state.anchored) {
          if (this.timeout) {
              clearTimeout(this.timeout);
              this.timeout = null;
          }
          this.layoutService.state.sidebarActive = true;
      }
  }

  onMouseLeave() {
      if (!this.layoutService.state.anchored) {
          if (!this.timeout) {
              this.timeout = setTimeout(
                  () => (this.layoutService.state.sidebarActive = false),
                  300
              );
          }
      }
  }

  resetOverlay() {
      if (this.layoutService.state.overlayMenuActive) {
          this.layoutService.state.overlayMenuActive = false;
      }
  }

  anchor() {
      this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }

  ngOnDestroy() {
      this.resetOverlay();
  }
}
