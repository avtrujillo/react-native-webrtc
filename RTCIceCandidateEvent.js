'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCIceCandidateEvent = void 0;
class RTCIceCandidateEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        this.candidate = null;
        if (eventInitDict && eventInitDict.candidate) {
            this.candidate = eventInitDict.candidate;
        }
    }
}
exports.RTCIceCandidateEvent = RTCIceCandidateEvent;
