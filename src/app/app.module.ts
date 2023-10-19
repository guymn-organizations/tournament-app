import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
