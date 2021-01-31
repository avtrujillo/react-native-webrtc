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
exports.RTCPeerConnection = exports.PEER_CONNECTION_EVENTS = void 0;
const event_target_shim_1 = require("event-target-shim");
const react_native_1 = require("react-native");
const MediaStream_1 = require("./MediaStream");
const MediaStreamEvent_1 = require("./MediaStreamEvent");
const MediaStreamTrackEvent_1 = require("./MediaStreamTrackEvent");
const RTCDataChannel_1 = require("./RTCDataChannel");
const RTCDataChannelEvent_1 = require("./RTCDataChannelEvent");
const RTCSessionDescription_1 = require("./RTCSessionDescription");
const RTCIceCandidate_1 = require("./RTCIceCandidate");
const RTCIceCandidateEvent_1 = require("./RTCIceCandidateEvent");
const RTCEvent_1 = require("./RTCEvent");
const RTCUtil = __importStar(require("./RTCUtil"));
const EventEmitter_1 = require("./EventEmitter");
const { WebRTCModule } = react_native_1.NativeModules;
exports.PEER_CONNECTION_EVENTS = [
    'connectionstatechange',
    'icecandidate',
    'icecandidateerror',
    'iceconnectionstatechange',
    'icegatheringstatechange',
    'negotiationneeded',
    'signalingstatechange',
    // Peer-to-peer Data API:
    'datachannel',
    // old:
    'addstream',
    'removestream',
];
let nextPeerConnectionId = 0;
class RTCPeerConnection extends event_target_shim_1.EventTarget {
    constructor(configuration) {
        super();
        this.signalingState = 'stable';
        this.iceGatheringState = 'new';
        this.connectionState = 'new';
        this.iceConnectionState = 'new';
        this._localStreams = [];
        this._remoteStreams = [];
        /**
         * The RTCDataChannel.id allocator of this RTCPeerConnection.
         */
        this._dataChannelIds = new Set();
        this._peerConnectionId = nextPeerConnectionId++;
        WebRTCModule.peerConnectionInit(configuration, this._peerConnectionId);
        this._registerEvents();
    }
    addStream(stream) {
        const index = this._localStreams.indexOf(stream);
        if (index !== -1) {
            return;
        }
        WebRTCModule.peerConnectionAddStream(stream._reactTag, this._peerConnectionId);
        this._localStreams.push(stream);
    }
    removeStream(stream) {
        const index = this._localStreams.indexOf(stream);
        if (index === -1) {
            return;
        }
        this._localStreams.splice(index, 1);
        WebRTCModule.peerConnectionRemoveStream(stream._reactTag, this._peerConnectionId);
    }
    createOffer(options) {
        return new Promise((resolve, reject) => {
            WebRTCModule.peerConnectionCreateOffer(this._peerConnectionId, RTCUtil.normalizeOfferAnswerOptions(options), (successful, data) => {
                if (successful) {
                    resolve(new RTCSessionDescription_1.RTCSessionDescription(data));
                }
                else {
                    reject(data); // TODO: convert to NavigatorUserMediaError
                }
            });
        });
    }
    createAnswer(options = {}) {
        return new Promise((resolve, reject) => {
            WebRTCModule.peerConnectionCreateAnswer(this._peerConnectionId, RTCUtil.normalizeOfferAnswerOptions(options), (successful, data) => {
                if (successful) {
                    resolve(new RTCSessionDescription_1.RTCSessionDescription(data));
                }
                else {
                    reject(data);
                }
            });
        });
    }
    setConfiguration(configuration) {
        WebRTCModule.peerConnectionSetConfiguration(configuration, this._peerConnectionId);
    }
    setLocalDescription(sessionDescription) {
        return new Promise((resolve, reject) => {
            WebRTCModule.peerConnectionSetLocalDescription(sessionDescription.toJSON ? sessionDescription.toJSON() : sessionDescription, this._peerConnectionId, (successful, data) => {
                if (successful) {
                    this.localDescription = sessionDescription;
                    resolve();
                }
                else {
                    reject(data);
                }
            });
        });
    }
    setRemoteDescription(sessionDescription) {
        return new Promise((resolve, reject) => {
            WebRTCModule.peerConnectionSetRemoteDescription(sessionDescription.toJSON ? sessionDescription.toJSON() : sessionDescription, this._peerConnectionId, (successful, data) => {
                if (successful) {
                    this.remoteDescription = sessionDescription;
                    resolve();
                }
                else {
                    reject(data);
                }
            });
        });
    }
    addIceCandidate(candidate) {
        return new Promise((resolve, reject) => {
            WebRTCModule.peerConnectionAddICECandidate(candidate.toJSON ? candidate.toJSON() : candidate, this._peerConnectionId, (successful) => {
                if (successful) {
                    resolve();
                }
                else {
                    // XXX: This should be OperationError
                    reject(new Error('Failed to add ICE candidate'));
                }
            });
        });
    }
    getStats() {
        return WebRTCModule.peerConnectionGetStats(this._peerConnectionId)
            .then((data) => {
            /* On both Android and iOS it is faster to construct a single
             JSON string representing the Map of StatsReports and have it
             pass through the React Native bridge rather than the Map of
             StatsReports. While the implementations do try to be faster in
             general, the stress is on being faster to pass through the React
             Native bridge which is a bottleneck that tends to be visible in
             the UI when there is congestion involving UI-related passing.
 
             TODO Implement the logic for filtering the stats based on
             the sender/receiver
             */
            return new Map(JSON.parse(data));
        });
    }
    getLocalStreams() {
        return this._localStreams.slice();
    }
    getRemoteStreams() {
        return this._remoteStreams.slice();
    }
    close() {
        WebRTCModule.peerConnectionClose(this._peerConnectionId);
    }
    _getTrack(streamReactTag, trackId) {
        const stream = this._remoteStreams.find(stream => stream._reactTag === streamReactTag);
        return stream && stream._tracks.find(track => track.id === trackId);
    }
    _unregisterEvents() {
        this._subscriptions?.forEach(e => e.remove());
        this._subscriptions = [];
    }
    _registerEvents() {
        this._subscriptions = [
            EventEmitter_1.EventEmitter.addListener('peerConnectionOnRenegotiationNeeded', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                // @ts-ignore
                this.dispatchEvent(new RTCEvent_1.RTCEvent('negotiationneeded'));
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionIceConnectionChanged', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                this.iceConnectionState = ev.iceConnectionState;
                // @ts-ignore
                this.dispatchEvent(new RTCEvent_1.RTCEvent('iceconnectionstatechange'));
                if (ev.iceConnectionState === 'closed') {
                    // This PeerConnection is done, clean up event handlers.
                    this._unregisterEvents();
                }
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionStateChanged', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                this.connectionState = ev.connectionState;
                // @ts-ignore
                this.dispatchEvent(new RTCEvent_1.RTCEvent('connectionstatechange'));
                if (ev.connectionState === 'closed') {
                    // This PeerConnection is done, clean up event handlers.
                    this._unregisterEvents();
                }
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionSignalingStateChanged', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                this.signalingState = ev.signalingState;
                // @ts-ignore
                this.dispatchEvent(new RTCEvent_1.RTCEvent('signalingstatechange'));
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionAddedStream', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                const stream = new MediaStream_1.MediaStream(ev);
                this._remoteStreams.push(stream);
                this.dispatchEvent(new MediaStreamEvent_1.MediaStreamEvent('addstream', { stream }));
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionRemovedStream', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                const stream = this._remoteStreams.find(s => s._reactTag === ev.streamId);
                if (stream) {
                    const index = this._remoteStreams.indexOf(stream);
                    if (index !== -1) {
                        this._remoteStreams.splice(index, 1);
                    }
                }
                this.dispatchEvent(new MediaStreamEvent_1.MediaStreamEvent('removestream', { stream }));
            }),
            EventEmitter_1.EventEmitter.addListener('mediaStreamTrackMuteChanged', ev => {
                if (ev.peerConnectionId !== this._peerConnectionId) {
                    return;
                }
                const track = this._getTrack(ev.streamReactTag, ev.trackId);
                if (track) {
                    track.muted = ev.muted;
                    const eventName = ev.muted ? 'mute' : 'unmute';
                    track.dispatchEvent(new MediaStreamTrackEvent_1.MediaStreamTrackEvent(eventName, { track }));
                }
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionGotICECandidate', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                const candidate = new RTCIceCandidate_1.RTCIceCandidate(ev.candidate);
                const event = new RTCIceCandidateEvent_1.RTCIceCandidateEvent('icecandidate', { candidate });
                this.dispatchEvent(event);
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionIceGatheringChanged', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                this.iceGatheringState = ev.iceGatheringState;
                if (this.iceGatheringState === 'complete') {
                    this.dispatchEvent(new RTCIceCandidateEvent_1.RTCIceCandidateEvent('icecandidate', null));
                }
                // @ts-ignore
                this.dispatchEvent(new RTCEvent_1.RTCEvent('icegatheringstatechange'));
            }),
            EventEmitter_1.EventEmitter.addListener('peerConnectionDidOpenDataChannel', ev => {
                if (ev.id !== this._peerConnectionId) {
                    return;
                }
                const evDataChannel = ev.dataChannel;
                const id = evDataChannel.id;
                // XXX RTP data channels are not defined by the WebRTC standard, have
                // been deprecated in Chromium, and Google have decided (in 2015) to no
                // longer support them (in the face of multiple reported issues of
                // breakages).
                if (typeof id !== 'number' || id === -1) {
                    return;
                }
                const channel = new RTCDataChannel_1.RTCDataChannel(this._peerConnectionId, evDataChannel.label, evDataChannel);
                // XXX webrtc::PeerConnection checked that id was not in use in its own
                // SID allocator before it invoked us. Additionally, its own SID
                // allocator is the authority on ResourceInUse. Consequently, it is
                // (pretty) safe to update our RTCDataChannel.id allocator without
                // checking for ResourceInUse.
                this._dataChannelIds.add(id);
                this.dispatchEvent(new RTCDataChannelEvent_1.RTCDataChannelEvent('datachannel', { channel }));
            })
        ];
    }
    /**
     * Creates a new RTCDataChannel object with the given label. The
     * RTCDataChannelInit dictionary can be used to configure properties of the
     * underlying channel such as data reliability.
     *
     * @param {string} label - the value with which the label attribute of the new
     * instance is to be initialized
     * @param {RTCDataChannelInit} dataChannelDict - an optional dictionary of
     * values with which to initialize corresponding attributes of the new
     * instance such as id
     */
    createDataChannel(label, dataChannelDict) {
        let id;
        const dataChannelIds = this._dataChannelIds;
        if (dataChannelDict && 'id' in dataChannelDict) {
            id = dataChannelDict.id;
            if (typeof id !== 'number') {
                throw new TypeError('DataChannel id must be a number: ' + id);
            }
            if (dataChannelIds.has(id)) {
                // @ts-ignore
                throw new ResourceInUse('DataChannel id already in use: ' + id);
            }
        }
        else {
            // Allocate a new id.
            // TODO Remembering the last used/allocated id and then incrementing it to
            // generate the next id to use will surely be faster. However, I want to
            // reuse ids (in the future) as the RTCDataChannel.id space is limited to
            // unsigned short by the standard:
            // https://www.w3.org/TR/webrtc/#dom-datachannel-id. Additionally, 65535
            // is reserved due to SCTP INIT and INIT-ACK chunks only allowing a
            // maximum of 65535 streams to be negotiated (as defined by the WebRTC
            // Data Channel Establishment Protocol).
            for (id = 1; id < 65535 && dataChannelIds.has(id); ++id)
                ;
            // TODO Throw an error if no unused id is available.
            dataChannelDict = Object.assign({ id }, dataChannelDict);
        }
        WebRTCModule.createDataChannel(this._peerConnectionId, label, dataChannelDict);
        dataChannelIds.add(id);
        return new RTCDataChannel_1.RTCDataChannel(this._peerConnectionId, label, dataChannelDict);
    }
}
exports.RTCPeerConnection = RTCPeerConnection;
