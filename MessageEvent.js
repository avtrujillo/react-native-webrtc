'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = void 0;
class MessageEvent extends Event {
    constructor(type, eventInitDict) {
        super(type, eventInitDict);
        // this.type = type.toString();
        // Object.assign(this, eventInitDict);
    }
}
exports.MessageEvent = MessageEvent;
