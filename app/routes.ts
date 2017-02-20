//angular provide TS definition for routes config to give extra intellisense and compile time safety
//so we imported this Routes
import { Routes} from '@angular/router'
import {
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent
} from './events/index'
import { Error404Component } from './errors/404.component'

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate:['canDeactivateCreateEvent'] }, //Order of routes matters so we add it on top(path: 'events/new' vs path: 'events/:id')
    { path: 'events', component: EventsListComponent, resolve: {events:EventListResolver} },
    { path: 'events/:id', component: EventDetailsComponent, canActivate:[EventRouteActivator] },
    { path: '404', component: Error404Component },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' }, //TODO: explore options for pathMatch
    { path: 'user', loadChildren: 'app/user/user.module#UserModule'}
]
