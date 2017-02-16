import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { ToastrService } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared/index'

@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <hr/>
        <div class="row">
            <div  *ngFor='let event of events' class="col-md-5">
               <event-thumbnail (click)=handleThumbnailClick(event.name) [event] = 'event'></event-thumbnail>
            </div>
        </div>
    </div>
    `
})
export class EventsListComponent implements OnInit {
    events:IEvent[]

    constructor(private eventService:EventService, private toastrService:ToastrService, private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events']
    }

    handleThumbnailClick(eventName) {

        //We can access globally available toastr service(like toastr.success(eventName))
        // but ts compiler will complain & difficult to test so we introduced a warpper on to toastr service

        this.toastrService.success(eventName)
    }
}
