import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/LoginComponent';
import { RegisterComponent } from './register/register.component';
import { LeaugesComponent } from './leauges/leauges.component';
import { ScrimsComponent } from './scrims/scrims.component';
import { TournamentComponent } from './tournament/tournament.component';
import { FinderComponent } from './finder/finder.component';
import { HomeComponent } from './home/home.component';
import { FinderPlayerComponent } from './finder-player/finder-player.component';
import { FinderTeamComponent } from './finder-team/finder-team.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGameComponent } from './profile-game/profile-game.component';
import { ProfileTeamComponent } from './profile-team/profile-team.component';
import { ProfileProfileComponent } from './profile-profile/profile-profile.component';
import { LeaugesdetailComponent } from './leaugesdetail/leaugesdetail.component';

import { HttpClientModule } from '@angular/common/http';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { ProfileListScrimComponent } from './profile-list-scrim/profile-list-scrim.component';
import { TeampostDetailComponent } from './teampost-detail/teampost-detail.component';
import { ScrimsDetailComponent } from './scrims-detail/scrims-detail.component';
import { DatePipe } from '@angular/common';
import { DetailmatchComponent } from './detailmatch/detailmatch.component';
import { LeaguesDetailComponent } from './leagues-detail/leagues-detail.component';
import { LeaguesOverviewComponent } from './leagues-overview/leagues-overview.component';
import { LeaguesTeamComponent } from './leagues-team/leagues-team.component';
import { LeaguesMatchComponent } from './leagues-match/leagues-match.component';
import { LeaguesCreaterComponent } from './leagues-creater/leagues-creater.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LeaugesComponent,
    ScrimsComponent,
    TournamentComponent,
    FinderComponent,
    HomeComponent,
    FinderPlayerComponent,
    FinderTeamComponent,
    ProfileComponent,
    ProfileGameComponent,
    ProfileTeamComponent,
    ProfileProfileComponent,
    LeaugesdetailComponent,
   
    CreateTourComponent,
    HeaderComponent,
    MessageComponent,
    ProfileListScrimComponent,
    TeampostDetailComponent,
    ScrimsDetailComponent,
    DetailmatchComponent,
    LeaguesDetailComponent,
    LeaguesOverviewComponent,
    LeaguesTeamComponent,
    LeaguesMatchComponent,
    LeaguesCreaterComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
