import { Component } from '@angular/core';
import { Advert } from '../model/advert';
import { AdvertService } from '../service/advert.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent {

  onFileSelected(event: any) {
  }

  onSubmit() {
  }
}
