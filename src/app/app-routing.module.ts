import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';
import { ProfileListScrimComponent } from './profile-list-scrim/profile-list-scrim.component';
import { ScrimsDetailComponent } from './scrims-detail/scrims-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'leauges', component: LeaugesComponent },
      { path: 'scrims', component: ScrimsComponent },
      { path: 'tournament', component: TournamentComponent },
      { path: 'scrims/:id', component: ScrimsDetailComponent },
      {
        path: 'finder',
        component: FinderComponent,
        children: [
          { path: '', redirectTo: 'player', pathMatch: 'full' }, // Redirect empty path to 'player'
          { path: 'player', component: FinderPlayerComponent },
          { path: 'team', component: FinderTeamComponent },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' }, // Redirect empty path to 'profile'
          { path: 'profile', component: ProfileProfileComponent },
          {
            path: 'game',
            component: ProfileGameComponent,
          },
          {
            path: 'team',
            component: ProfileTeamComponent,
          },
          { path: 'message', component: MessageComponent },
          { path: 'scrims', component: ProfileListScrimComponent },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
