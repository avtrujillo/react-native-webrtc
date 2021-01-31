'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMedia = void 0;
const react_native_1 = require("react-native");
const RTCUtil = __importStar(require("./RTCUtil"));
const MediaStream_1 = require("./MediaStream");
const MediaStreamError_1 = require("./MediaStreamError");
const Permissions_1 = require("./Permissions");
const { WebRTCModule } = react_native_1.NativeModules;
function getUserMedia(rawConstraints = {}) {
    // According to
    // https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia,
    // the constraints argument is a dictionary of type MediaStreamConstraints.
    if (typeof rawConstraints !== 'object') {
        return Promise.reject(new TypeError('constraints is not a dictionary'));
    }
    if ((typeof rawConstraints.audio === 'undefined' || !rawConstraints.audio)
        && (typeof rawConstraints.video === 'undefined' || !rawConstraints.video)) {
        return Promise.reject(new TypeError('audio and/or video is required'));
    }
    // Normalize constraints.
    let constraints = RTCUtil.normalizeConstraints(rawConstraints);
    // Request required permissions
    const reqPermissions = [];
    if (constraints.audio) {
        reqPermissions.push(Permissions_1.permissions.request({ name: 'microphone' }));
    }
    else {
        reqPermissions.push(Promise.resolve(false));
    }
    if (constraints.video) {
        reqPermissions.push(Permissions_1.permissions.request({ name: 'camera' }));
    }
    else {
        reqPermissions.push(Promise.resolve(false));
    }
    return new Promise((resolve, reject) => {
        Promise.all(reqPermissions).then(results => {
            const [audioPerm, videoPerm] = results;
            // Check permission results and remove unneeded permissions.
            if (!audioPerm && !videoPerm) {
                // https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia
                // step 4
                const error = {
                    message: 'Permission denied.',
                    name: 'SecurityError'
                };
                reject(new MediaStreamError_1.MediaStreamError(error));
                return;
            }
            audioPerm || (delete constraints.audio);
            videoPerm || (delete constraints.video);
            const success = (id, tracks) => {
                // TODO: make sure tracks is an array of tracks rather than a stream
                // Store initial constraints.
                let trackInfo;
                for (trackInfo of tracks) {
                    let c;
                    if (trackInfo.kind == 'audio') {
                        c = constraints.audio;
                    }
                    else {
                        c = constraints.video;
                    }
                    // const c = constraints[trackInfo.kind];
                    if (typeof c === 'object') {
                        trackInfo._constraints = RTCUtil.deepClone(c);
                    }
                }
                const info = {
                    streamId: id,
                    streamReactTag: id,
                    tracks
                };
                resolve(new MediaStream_1.MediaStream(info));
            };
            const failure = (type, message) => {
                let error;
                switch (type) {
                    case 'TypeError':
                        error = new TypeError(message);
                        break;
                }
                if (!error) {
                    error = new MediaStreamError_1.MediaStreamError({ message, name: type });
                }
                reject(error);
            };
            WebRTCModule.getUserMedia(constraints, success, failure);
        });
    });
}
exports.getUserMedia = getUserMedia;
