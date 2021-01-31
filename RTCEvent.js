'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCEvent = void 0;
class RTCEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
exports.RTCEvent = RTCEvent;
