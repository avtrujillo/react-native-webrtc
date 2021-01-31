'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStreamTrackEvent = void 0;
class MediaStreamTrackEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
exports.MediaStreamTrackEvent = MediaStreamTrackEvent;
