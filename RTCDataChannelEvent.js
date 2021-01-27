'use strict';
export class RTCDataChannelEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        // this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
