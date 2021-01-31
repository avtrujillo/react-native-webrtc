'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStreamEvent = void 0;
class MediaStreamEvent extends Event {
    constructor(type, eventInitDict) {
        super(type.toString(), eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
exports.MediaStreamEvent = MediaStreamEvent;
