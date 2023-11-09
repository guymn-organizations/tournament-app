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
  allTournament: Tournament[] = [];

  images: string[] = [];

  constructor(private tournament: LeaugesService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    console.log("object");
    (await this.tournament.getAllTournament(0, 10)).subscribe(
      async (tournaments) => {
        this.allTournament = tournaments;
        await this.setImages();
        console.log(this.allTournament);
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

    for (let i = 0; i < this.allTournament?.length; i++) {
      if (this.allTournament[i].imageTourUrl) {
        (
          await this.nav.service.getImage(
            this.allTournament[i].imageTourUrl as string
          )
        ).subscribe(
          (res) => {},
          (error) => {
            this.images[i] = error.error.text;
          }
        );
      }
    }
  }
}
