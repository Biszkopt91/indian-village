import { sexes } from '../config';

export default class Tribe {
    constructor( name ) {
        this.name = name;
        this.members = [];
        this.females = 0;
        this.males = 0;
        this.strength = 0;
    }

    get membersNumber() {
        return this.members.length;
    }

    addMember(participant) {
        console.log(participant)
        this.members.push(participant.id);
        this.strength += participant.age;
        this.increaseSex(participant.sex);
    }

    increaseSex(participantSex) {
        participantSex === sexes.male ? this.males++ : this.females++;
    }
}