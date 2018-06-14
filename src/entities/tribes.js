import Tribe from './tribe';
import Store from '../services/store';

export default class Tibes {
    constructor(tribesList, units, participantsList) {
        this.maxMemebers = Math.ceil(participantsList.length / tribesList.length);
        this.createTribes(tribesList);
        this.addUnits(units);

    }

    createTribes(tribesList) {
        this.tribes = tribesList.map(name => new Tribe(name));
    }

    addUnits(units) {
        units.forEach(unit => {
            const tribe = this.getWeekestTribe();
            unit.forEach(participantId => {
                tribe.addMember(Store.getParticipantById(participantId));
            })
        })
    }

    getWeekestTribe() {
        return this.tribes.reduce((prev, curr) => {
            return (curr.strength < prev.strength && curr.membersNumber < this.maxMemebers) ? curr : prev;
        }, {strength: Infinity});
    }
}