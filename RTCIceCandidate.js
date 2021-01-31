'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCIceCandidate = void 0;
class RTCIceCandidate {
    constructor(info) {
        this.candidate = info.candidate;
        this.sdpMLineIndex = info.sdpMLineIndex;
        this.sdpMid = info.sdpMid;
    }
    toJSON() {
        return {
            candidate: this.candidate,
            sdpMLineIndex: this.sdpMLineIndex,
            sdpMid: this.sdpMid,
        };
    }
}
exports.RTCIceCandidate = RTCIceCandidate;
