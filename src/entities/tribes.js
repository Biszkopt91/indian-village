import Tribe from './tribe';
import Store from '../services/store';
import { sexes } from '../config';

export default class Tibes {
    constructor(tribesList, units, participantsList) {
        this.participantsNumber = participantsList.length;
        this.tribesNumber = tribesList.length;
        this.maxFemales = Math.ceil(participantsList.filter(participant => participant.sex === sexes.female).length / tribesList.length);
        this.maxMales = Math.ceil(participantsList.filter(participant => participant.sex === sexes.male).length / tribesList.length);
        this.createTribes(tribesList);
        this.addUnits(units);
        console.log(units);
    }

    createTribes(tribesList) {
        this.tribes = tribesList.map(name => new Tribe(name));

    }

    addUnits(units) {
        units.forEach(unit => {
            const tribe = this.getWeekestTribe(unit);
            unit.forEach(participantId => {
                tribe.addMember(Store.getParticipantById(participantId));
            })
        })

        console.log(this.tribes, this.maxMemebers, this.maxFemales, this.maxMales);
    }

    getWeekestTribe(unit) {
        let tribesCounter = 0;
        const tribe = this.tribes.reduce((prev, curr) => {
            return (
                (
                    curr.strength < prev.strength
                    && curr.membersNumber < this.maxMemebers
                    && this.canAddUnitToTribe(curr, unit)
                ) || prev.membersNumber >= this.maxMemebers
            ) ? curr : prev;
        });
        if(tribe) {
            tribesCounter++;
            console.log(tribesCounter, tribe)
        }
        return tribe ? tribe : this.tribes.reduce((prev, curr) => curr.strength < prev.strength && prev.membersNumber >= this.maxMemebers, this.tribes[0]);
    }

    canAddUnitToTribe(tribe, unit) {
        const unitMales = unit.filter(participantId => Store.getParticipantById(participantId).sex === sexes.males).length;
        const unitFemales = unit.filter(participantId => Store.getParticipantById(participantId).sex === sexes.famales).length;
        return tribe.males + unitMales <= this.maxMales && tribe.females + unitFemales <= this.maxFemales;
    }

    get maxMemebers() {
        const maxNumber = Math.ceil(this.participantsNumber / this.tribesNumber);
        const minNumberCount = this.participantsNumber % this.tribesNumber;
        const maxNumberCount = this.tribesNumber - minNumberCount;

        return this.tribes.filter(tribe => tribe.membersNumber === maxNumber).length <= maxNumberCount ? maxNumber : maxNumber -1;
    }
}