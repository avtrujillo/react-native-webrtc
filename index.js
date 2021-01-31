'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobals = exports.Permissions = exports.permissions = exports.MediaDevices = exports.RTCDataChannel = exports.getDisplayMedia = exports.getUserMedia = exports.MediaStreamTrack = exports.MediaStream = exports.RTCSessionDescription = exports.RTCIceCandidate = exports.RTCPeerConnection = void 0;
var RTCPeerConnection_1 = require("./RTCPeerConnection");
Object.defineProperty(exports, "RTCPeerConnection", { enumerable: true, get: function () { return RTCPeerConnection_1.RTCPeerConnection; } });
var RTCIceCandidate_1 = require("./RTCIceCandidate");
Object.defineProperty(exports, "RTCIceCandidate", { enumerable: true, get: function () { return RTCIceCandidate_1.RTCIceCandidate; } });
var RTCSessionDescription_1 = require("./RTCSessionDescription");
Object.defineProperty(exports, "RTCSessionDescription", { enumerable: true, get: function () { return RTCSessionDescription_1.RTCSessionDescription; } });
// export {RTCView} from './RTCView';
var MediaStream_1 = require("./MediaStream");
Object.defineProperty(exports, "MediaStream", { enumerable: true, get: function () { return MediaStream_1.MediaStream; } });
var MediaStreamTrack_1 = require("./MediaStreamTrack");
Object.defineProperty(exports, "MediaStreamTrack", { enumerable: true, get: function () { return MediaStreamTrack_1.MediaStreamTrack; } });
var getUserMedia_1 = require("./getUserMedia");
Object.defineProperty(exports, "getUserMedia", { enumerable: true, get: function () { return getUserMedia_1.getUserMedia; } });
var getDisplayMedia_1 = require("./getDisplayMedia");
Object.defineProperty(exports, "getDisplayMedia", { enumerable: true, get: function () { return getDisplayMedia_1.getDisplayMedia; } });
var RTCDataChannel_1 = require("./RTCDataChannel");
Object.defineProperty(exports, "RTCDataChannel", { enumerable: true, get: function () { return RTCDataChannel_1.RTCDataChannel; } });
var MediaDevices_1 = require("./MediaDevices");
Object.defineProperty(exports, "MediaDevices", { enumerable: true, get: function () { return MediaDevices_1.MediaDevices; } });
var Permissions_1 = require("./Permissions");
Object.defineProperty(exports, "permissions", { enumerable: true, get: function () { return Permissions_1.permissions; } });
Object.defineProperty(exports, "Permissions", { enumerable: true, get: function () { return Permissions_1.Permissions; } });
// export {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   permissions,
//   registerGlobals
// };
function registerGlobals() {
    // Should not happen. React Native has a global navigator object.
    if (typeof navigator !== 'object') {
        throw new Error('navigator is not an object');
    }
    if (!navigator.mediaDevices) {
        // @ts-ignore
        navigator.mediaDevices = {};
    }
    let mediaDevices = new MediaDevices();
    // @ts-ignore
    navigator.mediaDevices.getUserMedia =
        mediaDevices.getUserMedia.bind(mediaDevices);
    // @ts-ignore
    navigator.mediaDevices.enumerateDevices =
        mediaDevices.enumerateDevices.bind(mediaDevices);
    // @ts-ignore
    global.RTCPeerConnection = RTCPeerConnection;
    // @ts-ignore
    global.RTCIceCandidate = RTCIceCandidate;
    // @ts-ignore
    global.RTCSessionDescription = RTCSessionDescription;
    // @ts-ignore
    global.MediaStream = MediaStream;
    // @ts-ignore
    global.MediaStreamTrack = MediaStreamTrack;
}
exports.registerGlobals = registerGlobals;
