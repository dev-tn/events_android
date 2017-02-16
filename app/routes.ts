//angular provide TS definition for routes config to give extra intellisense and compile time safety
//so we imported this Routes
import { Routes} from '@angular/router'
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'
import { CreateEventComponent } from './events/create-event.component'
import { Error404Component } from './errors/404.component'
import { EventRouteActivator } from './events/event-details/event-route-activator.service'
import { EventListResolver } from './events/events-list-resolver.service'

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate:['canDeactivateCreateEvent'] }, //Order of routes matters so we add it on top(path: 'events/new' vs path: 'events/:id')
    { path: 'events', component: EventsListComponent, resolve: {events:EventListResolver} },
    { path: 'events/:id', component: EventDetailsComponent, canActivate:[EventRouteActivator] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' }, //TODO: explore options for pathMatch
    { path: 'user', loadChildren: 'app/user/user.module#UserModule'}
]
