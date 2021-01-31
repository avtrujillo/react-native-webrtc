'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCSessionDescription = void 0;
class RTCSessionDescription {
    constructor(info = { type: null, sdp: '' }) {
        this.sdp = info.sdp;
        this.type = info.type;
    }
    toJSON() {
        return { sdp: this.sdp, type: this.type };
    }
}
exports.RTCSessionDescription = RTCSessionDescription;
