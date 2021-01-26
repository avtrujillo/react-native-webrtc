'use strict';
export default class MediaStreamEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
