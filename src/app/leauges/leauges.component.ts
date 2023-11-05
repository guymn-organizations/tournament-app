import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Tournament } from '../model/tournament';
import { LeaugesService } from '../service/leauges.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leauges',
  templateUrl: './leauges.component.html',
  styleUrls: ['./leauges.component.css'],
})
export class LeaugesComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);

  allTournament: undefined | Tournament[];

  images: string[] = [];

  constructor(private tournament: LeaugesService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    (await this.tournament.getAllTournament()).subscribe(
      async (tournaments) => {
        this.allTournament = tournaments;
        await this.setImages();
      }
    );
  }

  getAllTournament() {
    const temp = this.allTournament?.map((tour, index) => ({
      tour: tour,
      image: this.images[index],
    }));
    return temp;
  }

  async setImages() {
    if (!this.allTournament) {
      return;
    }
    for (const image of this.allTournament) {
      (await this.nav.service.getImage(image.imageTourUrl as string)).subscribe(
        (res) => {
        },
        (error) => {
          this.images.push(error.error.text);
        }
      );
      
    }
  }
}
