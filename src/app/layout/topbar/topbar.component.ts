import { Component, ElementRef, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { StorageService } from '../../services/util/storage.service';
import { UserBaseData } from '../../interfaces/user';
import { StorageKeys } from '../../enums';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: ''
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  private storageSV = inject(StorageService);

  private _userData: WritableSignal<UserBaseData | null> = signal(null);
  userData: Signal<UserBaseData | null> = computed(() => this._userData());

  constructor(public layoutService: LayoutService, public el: ElementRef) {
    this._userData.set(this.storageSV.get<UserBaseData>(StorageKeys.USER_INFO))
  }

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
