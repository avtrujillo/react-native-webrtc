'use strict';
export class MediaStreamTrackEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
