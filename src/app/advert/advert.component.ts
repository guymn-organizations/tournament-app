import { Component } from '@angular/core';
import { AdvertService } from '../service/advert.service';

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

  constructor(private advertService: AdvertService){}

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

  onSubmit() {
    console.log(this.imageBase64);
    console.log(this.advert.linkAdvertUrl);

    const formData = new FormData();
    formData.append('linkAdvertUrl', this.advert.linkAdvertUrl);

    if (this.imageBase64) {
      const blob = this.dataURItoBlob(this.imageBase64);
      formData.append('imageAdvert', blob, 'image.png');
    }

    this.advertService.createAdvert(formData).subscribe(
      (createdAdvert) => {
        // Handle the created advert here, if needed
        console.log('Advertisement created:', createdAdvert);
      },
      (error) => {
        // Handle any errors from the HTTP request
        console.error('Error creating advertisement:', error);
      }
    );
  }
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
