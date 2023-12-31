import { Component } from '@angular/core';
import { AdvertService } from '../service/advert.service';
import { Advert } from '../model/advert';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent {
  advert: any = {
    linkAdvertUrl: ''
  };
  imageBase64: string | null = null;

  constructor(private advertService: AdvertService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.imageBase64 = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(data: Advert) {
    console.log(this.imageBase64);
    console.log(this.advert.linkAdvertUrl);

    (await this.advertService.createAdvert(data)).subscribe((response) => {
      console.log('Response from service :',response)
    })
  }
}