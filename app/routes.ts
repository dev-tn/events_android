//angular provide TS definition for routes config to give extra intellisense and compile time safety
//so we imported this Routes
import { Routes} from '@angular/router'
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'

export const appRoutes:Routes = [
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' } //TODO: explore options for pathMatch
]
