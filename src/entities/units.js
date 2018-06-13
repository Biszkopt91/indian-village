import Store from '../services/store';

export default class Units {
    constructor(participans) {
        this.tribeUnits = [];
        this.generateUnits(participans);
    }

    findUnion(participantId) {
        return this.tribeUnits.find(unit => unit.some(id => id === participantId))
    }

    generateUnits(participants) {
        participants.forEach(participant => {
            this.addParticipant(participant);
        })
    }

    addParticipant(participant) {

        //buggerd as hell
        const partner = Store.getParticipantByFullName(participant.partnerFullName)
        const partnerId = partner ? partner.id : null;;
        const participantId = participant.id;

        if (partnerId !== null) {
            const participantUnion = this.findUnion(participantId);
            const partnerUnion = this.findUnion(partnerId);
            if (participantUnion && partnerUnion && (participantUnion !== partnerUnion)) {
                const newUnion = [...participantUnion, ...partnerUnion];
                this.tribeUnits.filter(union => (union !== participantUnion && union !== partnerUnion)).push(newUnion);
            } else if (participantUnion) {
                participantUnion.push(partnerId)
            } else if(partnerUnion) {
                partnerUnion.push(participantId);
            } else {
                this.tribeUnits.push([participantId, partnerId]);
            }
        } else {
            this.tribeUnits.push([participantId]);
        }
        
    }
}