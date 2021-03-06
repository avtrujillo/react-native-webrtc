'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStreamTrack = void 0;
const react_native_1 = require("react-native");
const event_target_shim_1 = require("event-target-shim");
const RTCUtil_1 = require("./RTCUtil");
const { WebRTCModule } = react_native_1.NativeModules;
const MEDIA_STREAM_TRACK_EVENTS = [
    'ended',
    'mute',
    'unmute',
    // see: https://www.w3.org/TR/mediacapture-streams/#constrainable-interface
    'overconstrained',
];
class MediaStreamTrack extends event_target_shim_1.EventTarget {
    constructor(info) {
        super();
        this._constraints = info.constraints || {};
        this._enabled = info.enabled;
        this.id = info.id;
        this.kind = info.kind;
        this.label = info.label;
        this.muted = false;
        this.remote = info.remote;
        const _readyState = info.readyState.toLowerCase();
        this.readyState = (_readyState === "initializing"
            || _readyState === "live") ? "live" : "ended";
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(enabled) {
        if (enabled === this._enabled) {
            return;
        }
        WebRTCModule.mediaStreamTrackSetEnabled(this.id, !this._enabled);
        this._enabled = !this._enabled;
        this.muted = !this._enabled;
    }
    stop() {
        WebRTCModule.mediaStreamTrackSetEnabled(this.id, false);
        this.readyState = 'ended';
        // TODO: save some stopped flag?
    }
    /**
     * Private / custom API for switching the cameras on the fly, without the
     * need for adding / removing tracks or doing any SDP renegotiation.
     *
     * This is how the reference application (AppRTCMobile) implements camera
     * switching.
     */
    _switchCamera() {
        if (this.remote) {
            throw new Error('Not implemented for remote tracks');
        }
        if (this.kind !== 'video') {
            throw new Error('Only implemented for video tracks');
        }
        WebRTCModule.mediaStreamTrackSwitchCamera(this.id);
    }
    applyConstraints() {
        throw new Error('Not implemented.');
    }
    clone() {
        throw new Error('Not implemented.');
    }
    getCapabilities() {
        throw new Error('Not implemented.');
    }
    getConstraints() {
        return RTCUtil_1.deepClone(this._constraints);
    }
    getSettings() {
        throw new Error('Not implemented.');
    }
    release() {
        WebRTCModule.mediaStreamTrackRelease(this.id);
    }
}
exports.MediaStreamTrack = MediaStreamTrack;
