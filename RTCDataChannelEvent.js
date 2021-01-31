'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCDataChannelEvent = void 0;
class RTCDataChannelEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        // this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
exports.RTCDataChannelEvent = RTCDataChannelEvent;
