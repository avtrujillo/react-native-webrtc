'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCDataChannel = exports.DATA_CHANNEL_EVENTS = void 0;
const react_native_1 = require("react-native");
const base64_js_1 = __importDefault(require("base64-js"));
const event_target_shim_1 = require("event-target-shim");
const { WebRTCModule } = react_native_1.NativeModules;
exports.DATA_CHANNEL_EVENTS = [
    'open',
    'message',
    'bufferedamountlow',
    'close',
    'error',
];
class ResourceInUse extends Error {
}
class RTCDataChannel extends event_target_shim_1.EventTarget {
    constructor(peerConnectionId, label, dataChannelDict) {
        super();
        this.binaryType = 'arraybuffer'; // we only support 'arraybuffer'
        this.bufferedAmount = 0;
        this.bufferedAmountLowThreshold = 0;
        this.maxPacketLifeTime = null;
        this.maxRetransmits = null;
        this.negotiated = false;
        this.ordered = true;
        this.protocol = '';
        this.readyState = 'connecting';
        this._peerConnectionId = peerConnectionId;
        this.label = label;
        // The standard defines dataChannelDict as optional for
        // RTCPeerConnection#createDataChannel and that is how we have implemented
        // the method in question. However, the method will (1) allocate an
        // RTCDataChannel.id if the caller has not specified a value and (2)
        // pass it to RTCDataChannel's constructor via dataChannelDict.
        // Consequently, dataChannelDict is not optional for RTCDataChannel's
        // constructor.
        this.id = ('id' in dataChannelDict) ? dataChannelDict.id : -1;
        this.ordered = !!dataChannelDict.ordered;
        this.maxPacketLifeTime = dataChannelDict.maxPacketLifeTime;
        this.maxRetransmits = dataChannelDict.maxRetransmits;
        this.protocol = dataChannelDict.protocol || '';
        this.negotiated = !!dataChannelDict.negotiated;
        //this._registerEvents(); // TODO
    }
    send(data) {
        if (typeof data === 'string') {
            WebRTCModule.dataChannelSend(this._peerConnectionId, this.id, data, 'text');
            return;
        }
        let uint8data;
        // Safely convert the buffer object to an Uint8Array for base64-encoding
        if (ArrayBuffer.isView(data)) {
            uint8data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }
        else if (data instanceof ArrayBuffer) {
            uint8data = new Uint8Array(data);
        }
        else {
            throw new TypeError('Data must be either string, ArrayBuffer, or ArrayBufferView');
        }
        WebRTCModule.dataChannelSend(this._peerConnectionId, this.id, base64_js_1.default.fromByteArray(uint8data), 'binary');
    }
    close() {
        if (this.readyState === 'closing' || this.readyState === 'closed') {
            return;
        }
        this.readyState = 'closing';
        WebRTCModule.dataChannelClose(this._peerConnectionId, this.id);
    }
}
exports.RTCDataChannel = RTCDataChannel;
