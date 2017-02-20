import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import {
    EventService,
    EventListResolver,
    EventsListComponent,
    EventRouteActivator,
    CreateEventComponent,
    EventDetailsComponent,
    EventThumbnailComponent,
    CreateSessionComponent,
    SessionListComponent
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';

import { appRoutes } from './routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        CreateEventComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent
    ],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        EventListResolver,
        AuthService,
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
