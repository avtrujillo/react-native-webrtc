import MediaStream from './MediaStream';
import MediaStreamTrack from './MediaStreamTrack';
import RTCDataChannel from './RTCDataChannel';
import RTCSessionDescription from './RTCSessionDescription';
import RTCIceCandidate from './RTCIceCandidate';
declare type RTCSignalingState = 'stable' | 'have-local-offer' | 'have-remote-offer' | 'have-local-pranswer' | 'have-remote-pranswer' | 'closed';
declare type RTCIceGatheringState = 'new' | 'gathering' | 'complete';
declare type RTCPeerConnectionState = 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
declare type RTCIceConnectionState = 'new' | 'checking' | 'connected' | 'completed' | 'failed' | 'disconnected' | 'closed';
declare const RTCPeerConnection_base: any;
export default class RTCPeerConnection extends RTCPeerConnection_base {
    localDescription?: RTCSessionDescription;
    remoteDescription?: RTCSessionDescription;
    signalingState: RTCSignalingState;
    iceGatheringState: RTCIceGatheringState;
    connectionState: RTCPeerConnectionState;
    iceConnectionState: RTCIceConnectionState;
    onconnectionstatechange?: Function;
    onicecandidate?: Function;
    onicecandidateerror?: Function;
    oniceconnectionstatechange?: Function;
    onicegatheringstatechange?: Function;
    onnegotiationneeded?: Function;
    onsignalingstatechange?: Function;
    onaddstream?: Function;
    onremovestream?: Function;
    _peerConnectionId: number;
    _localStreams: Array<MediaStream>;
    _remoteStreams: Array<MediaStream>;
    _subscriptions?: Array<any>;
    /**
     * The RTCDataChannel.id allocator of this RTCPeerConnection.
     */
    _dataChannelIds: Set<any>;
    constructor(configuration: any);
    addStream(stream: MediaStream): void;
    removeStream(stream: MediaStream): void;
    createOffer(options: any): Promise<unknown>;
    createAnswer(options?: {}): Promise<unknown>;
    setConfiguration(configuration: any): void;
    setLocalDescription(sessionDescription: RTCSessionDescription): Promise<void>;
    setRemoteDescription(sessionDescription: RTCSessionDescription): Promise<void>;
    addIceCandidate(candidate: RTCIceCandidate): Promise<void>;
    getStats(): any;
    getLocalStreams(): MediaStream[];
    getRemoteStreams(): MediaStream[];
    close(): void;
    _getTrack(streamReactTag: any, trackId: any): MediaStreamTrack | undefined;
    _unregisterEvents(): void;
    _registerEvents(): void;
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
    createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit): RTCDataChannel;
}
export {};
