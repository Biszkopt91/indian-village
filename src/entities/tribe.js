export default class Tribe {
    constructor({ name }) {
        this.name = name;
        this.members = [];
        this.females = 0;
        this.males = 0;
        this.strength = 0;
    }

    get membersNumber() {
        return this.members.length;
    }
}