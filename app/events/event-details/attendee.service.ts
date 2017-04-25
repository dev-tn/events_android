import { Injectable } from '@angular/core';
import { IEvent } from '../shared/event.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AttendeeService {

    constructor(private http:Http) {
    }

    addAttendee(event:any, attendeeName:string) {

        event.attendees++;
        event.attendeesList.push(attendeeName);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let url = `/api/events/${event._id}`;
        return this.http.put(url, JSON.stringify(event), options).catch(this.handleError);
    }

    userHasJoined(event:IEvent, attendeeName:string) {
        return event.attendeesList.some(attendee => attendee === attendeeName);
    }

    private handleError(error:Response) {
        return Observable.throw(error.statusText);
    }
}
