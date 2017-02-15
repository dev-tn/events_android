import { Component, Input } from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <!--Simple class binding -->
      <!--<div [class.green]="event?.time === '8:00 am'" [ngSwitch]= 'event?.time'>Time: {{event?.time}}-->
      <!-- using expression to add class-->
      <!--<div [ngClass]="{green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}" [ngSwitch]= 'event?.time'>Time: {{event?.time}}-->
      <!-- using function expression-->
      <div [ngClass]="getStartTimeClass()" [ngSwitch]= 'event?.time'>Time: {{event?.time}}
          <span *ngSwitchCase = "'8:00 am'">(Early Start)</span>
          <span *ngSwitchCase = "'10:00 am'">(Late Start)</span>
          <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: \${{event?.price}}</div>
      <!--<div [hidden] = '!event?.location'> just hide in DOM-->
      <!--<div *ngIf = event?.location> remove from DOM-->
      <div *ngIf = event?.location>
        <span>Location: {{event?.location?.address}}</span>
        <span class='pad-left'>{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
    </div>
  `,
    styles: [`
        .green {color: #003300 !important;}
        .bold {font-weight: bold;}
        .thumbnail {min-height:210px;}
        .pad-left {margin-left:10px;}
        .well div {color: #bbb}
    `]
})
export class EventThumbnailComponent {
    @Input() event:any

    getStartTimeClass() {
        //Way one
        //const isEarlyStart = this.event && this.event.time === '8:00 am'
        //return {green: isEarlyStart, bold: isEarlyStart}

        //Way two
        //if (this.event && this.event.time === '8:00 am')
        //    return 'green bold'
        //return ''

        //Way three
        if (this.event && this.event.time === '8:00 am')
            return ['green', 'bold']
        return []
    }
}
