import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/index';

@Component({
    templateUrl: 'app/events/create-event.component.html',
    styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error ::-moz-placeholder {color: #999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent {

    isDirty:boolean = true;

    constructor(private router:Router, private eventService:EventService) {
    }

    cancel() {
        this.router.navigate(['/events']);
    }

    saveEvent(formValues) {

        // No of persons attending this event/session
        formValues['attendees'] = 0; // initial state
        formValues['attendeesList'] = []; // initial state

        this.eventService.saveEvent(formValues).subscribe(event => {
            this.router.navigate(['/events']);
            this.isDirty = false;
        });
    }

}
