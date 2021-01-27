'use strict';
export class RTCIceCandidateEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        this.candidate = null;
        if (eventInitDict && eventInitDict.candidate) {
            this.candidate = eventInitDict.candidate;
        }
    }
}
