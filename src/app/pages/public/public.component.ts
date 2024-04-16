import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styles: ''
})
export class PublicComponent {
  tittle = environment.public.tittle;
  info = environment.public.info;
}
