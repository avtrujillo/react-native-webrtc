'use strict';
export default class MediaStreamTrackEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
