import { Component, Inject } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/index';
import { AttendeeService } from './attendee.service';
import { AuthService } from '../../user/auth.service';
import { TOASTR_TOKEN, Toastr } from '../../common/toastr.service';

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
    .container { padding-left:20px; padding-right:20px; }
    .event-image { height: 100px; }
    a { cursor: pointer }
  `]
})
export class EventDetailsComponent {
    event:IEvent;
    addMode:boolean;
    filterBy:string = 'all';
    sortBy:string = 'votes';

    constructor(private attendeeService:AttendeeService,
                private eventService:EventService,
                private auth:AuthService,
                private route:ActivatedRoute,
                @Inject(TOASTR_TOKEN) private toastr:Toastr) {

    }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.event = data['event'];
            this.addMode = false;
        });
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }

    joinEvent() {

        if (this.event.attendees < this.event.attendeesCount && !this.attendeeService.userHasJoined(this.event, this.auth.currentUser.userName)) {
            this.attendeeService.addAttendee(this.event, this.auth.currentUser.userName).subscribe((event) => {
                this.toastr.success('Successfully joined the event.');
            });
        }
        else
            this.toastr.info('No more seats left');
    }

    isJoined() {
        if (this.attendeeService.userHasJoined(this.event, this.auth.currentUser.userName)) {
            return true;
        }
        else {
            return false;
        }
    }
}
