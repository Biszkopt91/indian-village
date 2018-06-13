import moment from 'moment';
import { columnsConfig } from '../config';
function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default class Participant {
    

    constructor(participantRawObject) {
        this.id = guid();
        this.fullName = `${participantRawObject[columnsConfig.firstName]}_${participantRawObject[columnsConfig.lastName]}`.toLowerCase()
        this.partnerFullName = `${participantRawObject[columnsConfig.partnerFirstName] || ''}_${participantRawObject[columnsConfig.partnerLastName] || ''}`.toLowerCase()
        this.age = moment().diff(moment(participantRawObject[columnsConfig.birthDay], ['MM/DD/YYYY', 'YYYY-MM-DD']), 'years')
        
        this.externalData = {...participantRawObject};
    }

    get timestamp() {
        return moment(this.externalData[columnsConfig.timestamp], 'M/d/yyyy H:mm:ss').unix();
    }

    
}