import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PositionType, Team } from '../model/team';
import { Image } from '../model/image';
import { MessageService } from '../service/message.service';
import { MessageType } from '../model/message';
import { Profile } from '../model/profile';

@Component({
  selector: 'app-profile-team',
  templateUrl: './profile-team.component.html',
  styleUrls: [
    './profile-team.component.css',
    '../profile/profile.component.css',
  ],
})
export class ProfileTeamComponent implements OnInit {
  nav: NavbarComponent = inject(NavbarComponent);
  messageService: MessageService = inject(MessageService);

  selectedImageURL: string | ArrayBuffer | null = null;

  teamData = {
    id: '',
    name: '',
    contact: '',
  };

  loadding: boolean = false;

  positions = [
    PositionType.DSL,
    PositionType.ADL,
    PositionType.JG,
    PositionType.MID,
    PositionType.SUP,
    PositionType.reserver,
  ];

  playerImages: string[] = [];

  position_type: PositionType = PositionType.DSL;

  errorMessageCreate = '';
  errorMessageFind = '';

  imageTeam: Image | undefined;
  team?: Team;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.team = this.nav.team;
    if (!this.team) {
      await this.setTeam();
    }
    await this.setImageTeam();
    await this.setPlayerImages();
  }

  async setTeamId(id: string) {
    this.nav.getProfile().profileGame.myTeam = id;
    localStorage.setItem('team', id);
    await this.ngOnInit();
  }

  async setTeam() {
    try {
      const teamId = localStorage.getItem('team') as string;
      this.team = await (
        await this.nav.teamService.getTeamById(teamId)
      ).toPromise();
      this.teamData.contact = this.team?.contact as string;
    } catch (teamError) {}
  }

  async createTeam() {
    this.loadding = true;
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
        this.nav.team = respon;
        this.loadding = false;
      },
      (error) => {
        this.errorMessageCreate = error.error;
        this.loadding = false;
      }
    );
  }

  teamNameToFind: string | undefined;
  teamPositionToFind: PositionType = PositionType.DSL;
  async getTeamByName() {
    this.loadding = true;
    this.errorMessageCreate = '';
    this.errorMessageFind = '';

    (
      await this.messageService.sendJoinTeam(
        this.teamNameToFind as string,
        this.nav.profile?.profileGame.name as string,
        this.teamPositionToFind,
        MessageType.REQUEST_TO_JOIN_TEAM
      )
    ).subscribe(
      (response) => {},
      (error) => {
        if (error.status == 200) {
          alert('You have submitted a request to join the team.');
          this.teamNameToFind = '';
          this.teamPositionToFind = PositionType.DSL;
        }
        this.loadding = false;
      }
    );
  }

  async addPlayer(id: string) {
    (
      await this.nav.teamService.addTeamPlayer(
        id,
        this.nav.getProfile().profileGame.name,
        this.position_type
      )
    ).subscribe(async (res) => {
      await this.ngOnInit();
    });
  }

  async toLeavTeam() {
    try {
      if (!confirm('Are you sure?')) {
        return;
      }
      await (
        await this.nav.teamService.leavePlayer(
          this.team?.id as string,
          this.nav.getProfile().profileGame.name
        )
      ).toPromise();
      localStorage.setItem('team', '');
      this.nav.getProfile().profileGame.myTeam = null;
      this.ngOnInit();
    } catch (teamError) {}
  }

  async deleteTeam() {
    if (!confirm('Are you sure?')) {
      return;
    }

    (await this.nav.teamService.deleteTeam(this.team?.id as string)).subscribe(
      async (response) => {},
      async (error) => {
        localStorage.setItem('team', '');
        this.nav.profile!.profileGame.myTeam = null;
        this.nav.team = undefined;
        this.selectedImageURL = null;
        this.teamData.name = '';
        this.position_type = PositionType.DSL;
        this.ngOnInit();
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

  async addReservervrToMainTeam(
    index_reserver: number,
    index_position: number
  ) {
    (
      await this.nav.teamService.outTeamPosition(
        this.team?.name as string,
        index_reserver,
        index_position
      )
    ).subscribe(async (respon) => {
      if (this.team) {
        this.team = respon;
        await this.setImage(
          respon.positions[index_position].player?.imageProfileUrl as string,
          index_position
        );
      }
    });
  }

  async setImage(id: string, index: number) {
    (await this.nav.service.getImage(id)).subscribe(
      (res) => {},
      async (result) => {
        this.playerImages[index] = result.error.text;
      }
    );
  }
}
