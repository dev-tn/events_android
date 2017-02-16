//angular provide TS definition for routes config to give extra intellisense and compile time safety
//so we imported this Routes
import { Routes} from '@angular/router'
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'
import { CreateEventComponent } from './events/create-event.component'

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent }, //Order of routes matters so we add it on top(path: 'events/new' vs path: 'events/:id')
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' } //TODO: explore options for pathMatch
]
