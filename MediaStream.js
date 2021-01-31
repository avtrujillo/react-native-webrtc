'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStream = exports.MEDIA_STREAM_EVENTS = void 0;
const react_native_1 = require("react-native");
const event_target_shim_1 = require("event-target-shim");
const uuid_1 = __importDefault(require("uuid"));
const MediaStreamTrack_1 = require("./MediaStreamTrack");
const { WebRTCModule } = react_native_1.NativeModules;
exports.MEDIA_STREAM_EVENTS = [
    'active',
    'inactive',
    'addtrack',
    'removetrack',
];
class MediaStream extends event_target_shim_1.EventTarget {
    /**
     * A MediaStream can be constructed in several ways, depending on the paramters
     * that are passed here.
     *
     * - undefined: just a new stream, with no tracks.
     * - MediaStream instance: a new stream, with a copy of the tracks of the passed stream.
     * - Array of MediaStreamTrack: a new stream with a copy of the tracks in the array.
     * - object: a new stream instance, represented by the passed info object, this is always
     *   done internally, when the stream is first created in native and the JS wrapper is
     *   built afterwards.
     */
    constructor(arg) {
        super();
        this.active = true;
        this._tracks = [];
        // Assigm a UUID to start with. It may get overridden for remote streams.
        this.id = uuid_1.default.v4();
        // Local MediaStreams are created by WebRTCModule to have their id and
        // reactTag equal because WebRTCModule follows the respective standard's
        // recommendation for id generation i.e. uses UUID which is unique enough
        // for the purposes of reactTag.
        this._reactTag = this.id;
        if (typeof arg === 'undefined') {
            WebRTCModule.mediaStreamCreate(this.id);
        }
        else if (arg instanceof MediaStream) {
            WebRTCModule.mediaStreamCreate(this.id);
            for (const track of arg.getTracks()) {
                this.addTrack(track);
            }
        }
        else if (Array.isArray(arg)) {
            WebRTCModule.mediaStreamCreate(this.id);
            for (const track of arg) {
                this.addTrack(track);
            }
        }
        else if (typeof arg === 'object' && arg.streamId && arg.streamReactTag && arg.tracks) {
            this.id = arg.streamId;
            this._reactTag = arg.streamReactTag;
            for (const trackInfo of arg.tracks) {
                // We are not using addTrack here because the track is already part of the
                // stream, so there is no need to add it on the native side.
                this._tracks.push(new MediaStreamTrack_1.MediaStreamTrack(trackInfo));
            }
        }
        else {
            throw new TypeError(`invalid type: ${typeof arg}`);
        }
    }
    addTrack(track) {
        const index = this._tracks.indexOf(track);
        if (index !== -1) {
            return;
        }
        this._tracks.push(track);
        WebRTCModule.mediaStreamAddTrack(this._reactTag, track.id);
    }
    removeTrack(track) {
        const index = this._tracks.indexOf(track);
        if (index === -1) {
            return;
        }
        this._tracks.splice(index, 1);
        WebRTCModule.mediaStreamRemoveTrack(this._reactTag, track.id);
    }
    getTracks() {
        return this._tracks.slice();
    }
    getTrackById(trackId) {
        return this._tracks.find(track => track.id === trackId);
    }
    getAudioTracks() {
        return this._tracks.filter(track => track.kind === 'audio');
    }
    getVideoTracks() {
        return this._tracks.filter(track => track.kind === 'video');
    }
    clone() {
        throw new Error('Not implemented.');
    }
    toURL() {
        return this._reactTag;
    }
    release(releaseTracks = true) {
        for (const track of this._tracks) {
            this.removeTrack(track);
            if (releaseTracks) {
                track.release();
            }
        }
        WebRTCModule.mediaStreamRelease(this._reactTag);
    }
}
exports.MediaStream = MediaStream;
