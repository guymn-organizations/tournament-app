import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType, Team } from '../model/team';
import { Profile } from '../model/profile';
import { GobalServiceService } from '../service/gobal-service.service';
import { Image } from '../model/image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the map operator
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-profile-team',
  templateUrl: './profile-team.component.html',
  styleUrls: ['./profile-team.component.css'],
})
export class ProfileTeamComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);

  selectedImageURL: string | ArrayBuffer | null = null;

  teamData = {
    id: '',
    name: '',
    contact: '',
  };

  position = [
    PositionType.DSL,
    PositionType.ADL,
    PositionType.JG,
    PositionType.MID,
    PositionType.SUP,
  ];

  playerImages: string[] = [];

  position_type: PositionType = PositionType.DSL;

  errorMessageCreate = '';
  errorMessageFind = '';

  imageTeam: Image | undefined;
  team?: Team;

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.setTeam();
    await this.setImageTeam();
    await this.setPlayerImages();
  }

  async setTeamId(id: string) {
    this.nav.getProfile().profileGame.myTeam = id;
    localStorage.setItem('team', id);
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
      this.teamData.contact = this.team?.contact as string;
    } catch (teamError) {
      console.error('Error fetching team data:', teamError);
    }
  }

  async createTeam() {
    this.errorMessageCreate = '';
    this.errorMessageFind = '';

    const teamData: Partial<Team> = {
      name: this.teamData.name,
      leader: this.nav.getProfile(),
      imageTeamUrl: this.selectedImageURL as string,
    };

    (await this.nav.teamService.createTeam(teamData as Team)).subscribe(
      async (respon) => {
        await this.setTeamId(respon.id);
        await this.addPlayer(respon.id);
      },
      (error) => {
        this.errorMessageCreate = error.error;
      }
    );
  }

  async getTeamByCode() {
    this.errorMessageCreate = '';
    this.errorMessageFind = '';

    console.log(this.teamData.id);
    (
      await this.nav.teamService.addReserverPlayer(
        this.teamData.id,
        this.nav.getProfile().id
      )
    ).subscribe(
      async (respon) => {
        await this.setTeamId(respon.id);
        await this.ngOnInit();
      },
      (error) => {
        this.errorMessageFind = error.error;
      }
    );
  }

  async addPlayer(id: string) {
    (
      await this.nav.teamService.addTeamPlayer(
        id,
        this.nav.getProfile().id,
        this.position_type
      )
    ).subscribe(async (res) => {
      console.log(res);
      await this.ngOnInit();
    });
  }

  async toLeavTeam() {
    try {
      await (
        await this.nav.teamService.leavePlayer(
          this.team?.id as string,
          this.nav.getProfile().id
        )
      ).toPromise();
      localStorage.setItem('team', '');
      this.nav.getProfile().profileGame.myTeam = null;
      this.ngOnInit();
    } catch (teamError) {
      console.error('Error fetching team data:', teamError);
    }
  }

  async deleteTeam() {
    (await this.nav.teamService.deleteTeam(this.team?.id as string)).subscribe(
      async (response) => {},
      async (error) => {
        if (error.status == 202) {
          localStorage.setItem('team', '');
          this.nav.getProfile().profileGame.myTeam = null;
          this.ngOnInit();
        }
      }
    );
  }

  getMyPosition() {
    return this.team?.positions.find((data) => {
      return data.player?.id == this.nav.getProfile().id;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.saveImage(file);
    }
  }

  saveImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.selectedImageURL = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  isLeader() {
    return this.nav.getProfile().id == this.team?.leader.id;
  }

  unImgTeam() {
    return this.team?.name[0];
  }

  async setImageTeam() {
    (
      await this.nav.service.getImage(this.team?.imageTeamUrl as string)
    ).subscribe(
      (res) => {},
      (result) => {
        this.imageTeam = result.error.text;
      }
    );
  }

  async setPlayerImages() {
    const image_id = (this.team?.positions || []).map((position) => {
      if (position.player !== null && position.player.imageProfileUrl) {
        return position.player.imageProfileUrl;
      } else {
        return '';
      }
    });

    for (let id = 0; id < 5; id++) {
      if (image_id[id]) {
        (await this.nav.service.getImage(image_id[id])).subscribe(
          (res) => {},
          async (result) => {
            this.playerImages[id] = result.error.text;
          }
        );
      }
    }
  }

  getPosition() {
    return this.team?.positions.map((data, index) => ({
      ...data,
      imageUrl: this.playerImages[index] || '',
    }));
  }

  editContact: boolean = false;

  toEditContact() {
    this.editContact = !this.editContact;
  }

  async saveContact() {
    if (this.teamData.contact == this.team?.contact) {
      this.toEditContact();
      return;
    }

    (
      await this.nav.teamService.setConact(
        this.team?.id as string,
        this.teamData.contact as string
      )
    ).subscribe();
    this.toEditContact();
  }
}
