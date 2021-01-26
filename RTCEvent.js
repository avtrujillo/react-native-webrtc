'use strict';
export default class RTCEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
