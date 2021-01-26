'use strict';
export default class RTCIceCandidateEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        this.candidate = null;
        if (eventInitDict && eventInitDict.candidate) {
            this.candidate = eventInitDict.candidate;
        }
    }
}
