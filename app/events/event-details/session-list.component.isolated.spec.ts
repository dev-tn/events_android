import { SessionListComponent } from './session-list.component';
import { ISession } from '../shared/event.model';

describe('SessionListComponent', () => {
    let component:SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe('ngOnChanges', () => {

        it('should filter session correctly', () => {

            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'beginner'},
                {name: 'session 3', level: 'intermediate'},
                {name: 'session 4', level: 'advance'}];

            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2);
        });

        it('should sort session correctly', () => {

            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'beginner'},
                {name: 'session 4', level: 'intermediate'},
                {name: 'session 3', level: 'advance'}];

            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions[3].name).toBe('session 4');
        });
    });
});