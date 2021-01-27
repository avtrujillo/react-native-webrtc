'use strict';
export class MediaStreamEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
