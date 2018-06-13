import Participant from '../entities/participant';

class Store {

    constructor() {

        this.participants = [];
        this.tribes = [];
        this.units = [];
    }

    initStore(rawParticipants) {
        this.initParticipants(rawParticipants);
        debugger;
    }

    initParticipants(rawParticipants) {
        let tempParticipant = rawParticipants.map(rawParticipant => new Participant(rawParticipant));
        this.participants = this.sliceOutdatedRegitrations(tempParticipant);
        debugger
    }

    sliceOutdatedRegitrations(participants) {
        return participants.slice(0, 150);
    }

}

export default new Store();