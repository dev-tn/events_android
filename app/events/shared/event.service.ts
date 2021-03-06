import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {IEvent, ISession} from './event.model';

@Injectable()
export class EventService {

    constructor(private http:Http) {
    }

    getEvents():Observable<IEvent[]> {
        return this.http.get('/api/events').map((response:Response) => {
            return <IEvent[]>response.json();
        }).catch(this.handleError);
    }

    // TODO: To better understand it watch video [14_03_Listening to Resolved Data Changes.mp4]
    getEvent(id:string):Observable<IEvent> {
        return this.http.get('/api/events/' + id).map((response:Response) => {
            return <IEvent>response.json();
        }).catch(this.handleError);
    }

    saveEvent(event):Observable<IEvent> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post('/api/events', JSON.stringify(event), options).map((response:Response)=> {
            return response.json();
        }).catch(this.handleError);
    }

    searchSessions(searchTerm:string) {
        return this.http.get('/api/sessions/search?search=' + searchTerm).map((response:Response) => {
            return response.json();
        }).catch(this.handleError);
    }

    private handleError(error:Response) {
        return Observable.throw(error.statusText);
    }

}
