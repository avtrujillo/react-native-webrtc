'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStreamErrorEvent = void 0;
class MediaStreamErrorEvent {
    constructor(type, eventInitDict) {
        this.type = type.toString();
        Object.assign(this, eventInitDict);
    }
}
exports.MediaStreamErrorEvent = MediaStreamErrorEvent;
