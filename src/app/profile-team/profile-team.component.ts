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

  isCreateTeam = false;
  isFindTeam = false;

  teamData = {
    id: '',
    name: '',
    url: '',
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

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
    } catch (teamError) {
      console.error('Error fetching team data:', teamError);
    }
  }

  clickCreateTeam() {
    this.errorMessageCreate = '';
    this.isCreateTeam = !this.isCreateTeam;
  }

  clickFindTeam() {
    this.errorMessageFind = '';
    this.isFindTeam = !this.isFindTeam;
  }

  async createTeam() {
    const imageData: Partial<Image> = {
      imageUrl: this.selectedImageURL as string,
    };

    const teamData: Partial<Team> = {
      name: this.teamData.name,
      leader: this.nav.getProfile(),
    };

    console.log(imageData);
    (await this.nav.service.postImage(imageData as Image))
      .pipe(
        map((response) => response['text']()) // Use ['text'] to access the text() method
      )
      .subscribe(
        (result) => console.log(result),
        async (error) => {
          if (error.status == 406) {
            this.errorMessageCreate = error.error;
          } else if (error.status == 200) {
            teamData.imageTeamUrl = error.error.text;
            await this.postTeam(teamData as Team);
          }
        }
      );
  }

  async postTeam(teamData: Team) {
    (await this.nav.teamService.createTeam(teamData)).subscribe(
      async (response) => {
        // Handle the response here
        console.log(response);
        await this.addPlayer(
          response.id,
          this.nav.getProfile().id,
          this.position_type
        );
      },
      (error) => {
        this.errorMessageCreate = error.error;
        // Handle the error
      }
    );
  }

  async addPlayer(id: string, player: string, type: PositionType) {
    (await this.nav.teamService.addTeamPlayer(id, player, type)).subscribe(
      async (response) => {
        await this.nav.ngOnInit();
      },
      async (error) => {
        if (error.status == 201) {
          await this.nav.ngOnInit();
        }
      }
    );
  }

  async getTeamByCode() {
    (await this.nav.teamService.getTeamById(this.teamData.id)).subscribe(
      (response) => {
        // Handle the response here
        this.nav.updateProfile();
      },
      (error) => {
        this.errorMessageFind = error.error;
        // Handle the error
      }
    );
  }

  async toLeavTeam() {
    try {
      await (
        await this.nav.teamService.leavePlayer(
          this.team?.id as string,
          this.nav.getProfile().id
        )
      ).toPromise();
    } catch (teamError) {
      console.error('Error fetching team data:', teamError);
    }
  }

  async deleteTeam() {
    const response = (
      await this.nav.teamService.deleteTeam(this.team?.id as string)
    ).subscribe(
      async (response) => {},
      async (error) => {
        if (error.status == 202) {
          this.nav.ngOnInit();
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

  checkMessage(): boolean {
    return this.team?.messages.length == 0;
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
}
