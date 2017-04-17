import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Observable';

describe('VoterService', ()=> {

    let voterService:VoterService, mockHttp;
    beforeEach(()=> {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            let session = {id: 6, voters: ['ali', 'ahmad']};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, 'ali');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('ahmad');
        });

        it('should call http.delete with the right URL', () => {
            let session = {id: 6, voters: ['ali', 'ahmad']};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, 'ali');

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/ali');

        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            let session = {id: 6, voters: ['ahmad']};
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(3, <ISession>session, 'ali');

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/ali', '{}', jasmine.any(Object));

        });
    });
});
