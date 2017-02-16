import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'

import {
    EventService,
    EventListResolver,
    EventsListComponent,
    EventRouteActivator,
    CreateEventComponent,
    EventDetailsComponent,
    EventThumbnailComponent
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/404.component';

import { appRoutes } from './routes';

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        CreateEventComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        Error404Component
    ],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        EventListResolver,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {
}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    else
        return true
}
