import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { DurationPipe } from '../shared/duration.pipe';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
    let fixture:ComponentFixture<SessionListComponent>,
        component:SessionListComponent,
        element:HTMLElement,
        debugEl:DebugElement;

    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Ahmad'}
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe,
                // CollapsibleWellComponent
            ],
            providers: [
                {provide: AuthService, useValue: mockAuthService},
                {provide: VoterService, useValue: mockVoterService}
            ],
            schemas: [
                NO_ERRORS_SCHEMA // used it with great care, for now we have ignored the children components(CollapsibleWell & Upvote)
            ]
        }).compileComponents(); // for systemjs no need for webpack
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        component = fixture.componentInstance;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [{
                id: 3,
                name: 'session 1',
                presenter: 'Ahmad',
                duration: 2,
                level: 'advance',
                abstract: 'abstract',
                voters: ['ali', 'hassan']
            }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();
            fixture.detectChanges();

            // * WAY ONE * through element
            // expect(element.querySelector('[well-title]').textContent).toContain('session 1');

            // * WAY TWO * through debug element
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1');
        });
    });
});