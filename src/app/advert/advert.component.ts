import { Component } from '@angular/core';
import { Advert } from '../model/advert';
import { AdvertService} from '../service/advert.service';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css']
})
export class AdvertComponent {
  advert: Advert = {
    id:'',
    imageAdvertUrl: '',
    linkAdvertUrl: '',
  };
  selectedFile!: File ;

  constructor(private AdvertService: AdvertService) {}

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imageFile', this.selectedFile);
      formData.append('imageFile', this.advert.imageAdvertUrl);
      formData.append('linkAdvertUrl', this.advert.linkAdvertUrl);

      this.AdvertService.createAdvert(formData).subscribe(
        (response) => {
          console.log('Advert created successfully', response);
          this.advert = {
            id: this.advert.id,
            imageAdvertUrl: this.advert.imageAdvertUrl,
            linkAdvertUrl: this.advert.linkAdvertUrl,
          };
        },
        (error) => {
          console.error('Failed to create advert', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
