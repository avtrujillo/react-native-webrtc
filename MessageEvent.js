'use strict';
export class MessageEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
