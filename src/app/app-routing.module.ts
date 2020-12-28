import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { HomeComponent } from './home/home.component';
import { EventResolverService } from './services/event.resolver.service';
import { UserResolverService } from './services/user.resolver.service';
import { UsersListComponent } from './user/users-list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'events',
    component: EventListComponent,
    resolve: {
      EventResolverService,
    },
  },
  {
    path: 'users',
    component: UsersListComponent,
    resolve: {
      UserResolverService,
    },
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [EventResolverService, UserResolverService],
})
export class AppRoutingModule {}
