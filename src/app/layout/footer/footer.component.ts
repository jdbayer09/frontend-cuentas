import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  actualDate = computed(() => new Date().getFullYear());

  get logo() {
    return 'white';
  }
}
