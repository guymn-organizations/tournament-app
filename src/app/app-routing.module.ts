import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { LeaugesdetailComponent } from './leaugesdetail/leaugesdetail.component';
import { LeaugesTeamComponent } from './leauges-team/leauges-team.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'leauges', component: LeaugesComponent },
  { path: 'leaugesdetail', component: LeaugesdetailComponent },
  { path: 'leauges-team', component: LeaugesTeamComponent },
  { path: 'scrims', component: ScrimsComponent },
  { path: 'tournament', component: TournamentComponent },
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
      { path: 'profile', component: ProfileProfileComponent },
      { path: 'game', component: ProfileGameComponent },
      { path: 'team', component: ProfileTeamComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
