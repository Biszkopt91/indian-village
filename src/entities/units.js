import Store from '../services/store';

export default class Units {
    constructor(participans) {
        this.tribeUnits = [];
        this.generateUnits(participans);
        this.sortUnits();
    }

    findUnion(participantId) {
        return this.tribeUnits.find(unit => unit.some(id => id === participantId))
    }

    generateUnits(participants) {
        participants.forEach(participant => {
            this.addParticipant(participant);
        })
    }

    sortUnits() {
        this.tribeUnits = this.tribeUnits.sort((itemA, itemB) => {
            if (itemA.length > itemB.length) {
                return -1;
            } else if (itemA.length < itemB.length) {
                return 1;
            }

            return 0;
        });
    }

    addParticipant(participant) {

        const partner = Store.getParticipantByFullName(participant.partnerFullName)
        const partnerId = partner ? partner.id : null;
        const participantId = participant.id;
        const participantUnion = this.findUnion(participantId);

        if (partnerId !== null) {
            const participantUnion = this.findUnion(participantId);
            const partnerUnion = this.findUnion(partnerId);
            if (participantUnion && partnerUnion) {
                if( (participantUnion !== partnerUnion)) {
                    const newUnion = [...participantUnion, ...partnerUnion];
                    this.tribeUnits.filter(union => (union !== participantUnion && union !== partnerUnion)).push(newUnion);
                }
            } else if (participantUnion) {
                participantUnion.push(partnerId)
            } else if (partnerUnion) {
                partnerUnion.push(participantId);
            } else {
                this.tribeUnits.push([participantId, partnerId]);
            }
        } else if (!participantUnion) {
            this.tribeUnits.push([participantId]);
        }
        
    }
}