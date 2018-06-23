import Participant from '../entities/participant';
import Units from '../entities/units';
import Tribes from '../entities/tribes';

class Store {

    constructor() {
        this.tribeNames = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.participants = [];
        this.tribes = [];
        this.units = [];
    }

    initStore(rawParticipants) {
        this.initParticipants(rawParticipants);
        this.initUnits();
        this.initTribes();
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
    }

    initTribes() {
        const tribes = new Tribes(this.tribeNames, this.units, this.participants);
        this.tribes = tribes.tribes;
    }

    getParticipantByFullName(fullName) {
        return this.participants.find(participant => participant.fullName === fullName);
    }
    getParticipantById(id) {
        return this.participants.find(participant => participant.id === id);
    }

}

const storeInstance = new Store();

export default storeInstance;