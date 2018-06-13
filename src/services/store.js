import Participant from '../entities/participant';
import Units from '../entities/units';


class Store {

    constructor() {

        this.participants = [];
        this.tribes = [];
        this.units = [];
    }

    initStore(rawParticipants) {
        this.initParticipants(rawParticipants);
        this.initUnits();
    }

    initParticipants(rawParticipants) {
        let tempParticipant = rawParticipants.map(rawParticipant => new Participant(rawParticipant));
        this.participants = this.sliceOutdatedRegitrations(tempParticipant);
    }

    sliceOutdatedRegitrations(participants) {
        return participants.slice(0, 150);
    }

    initUnits() {
        const units = new Units(this.participants);
        this.units = units.tribeUnits;
        debugger
    }

    getParticipantByFullName(fullName) {
        return this.participants.find(participant => participant.fullName === fullName);
    }

}

const storeInstance = new Store();

export default storeInstance;