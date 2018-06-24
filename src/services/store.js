import Participant from '../entities/participant';
import Units from '../entities/units';
import Tribes from '../entities/tribes';
import { jsonToXlsx } from '../services/xlsx-parser';

class Store {

    constructor() {
        this.participants = [];
        this.tribes = [];
        this.units = [];
    }

    setTribes(tribes) {
        this.tribeNames = tribes;
    }

    setParticipantsCount(count) {
        this.participantsCount = count;
    }

    initStore(rawParticipants) {
        this.initParticipants(rawParticipants);
        this.initUnits();
        this.initTribes();
    }

    initParticipants(rawParticipants) {
        
        let tempParticipant = rawParticipants.map(rawParticipant => new Participant(rawParticipant));
        tempParticipant.forEach((part, index) => {
            console.log(index, part.partnerFullName)
        })
        this.participants = this.sliceOutdatedRegitrations(tempParticipant);
    }

    sliceOutdatedRegitrations(participants) {
        return participants.slice(0, this.participantsCount);
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

    saveFile(index) {
        const tribe = this.tribes[index];
        const writeData = tribe.members
                .map(memberId => this.getParticipantById(memberId))
                .map(member => {
                    return {
                        ...member.externalData,
                        "Plemię": tribe.name,
                        "Wolny": member.isBlocked ? "Nie" : "Tak",
                    }
                })

        jsonToXlsx(writeData, tribe.name);
    }


}

const storeInstance = new Store();

export default storeInstance;