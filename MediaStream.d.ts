import MediaStreamTrack from './MediaStreamTrack';
declare const MediaStream_base: any;
export default class MediaStream extends MediaStream_base {
    id: string;
    active: boolean;
    onactive?: Function;
    oninactive?: Function;
    onaddtrack?: Function;
    onremovetrack?: Function;
    _tracks: Array<MediaStreamTrack>;
    /**
     * The identifier of this MediaStream unique within the associated
     * WebRTCModule instance. As the id of a remote MediaStream instance is unique
     * only within the associated RTCPeerConnection, it is not sufficiently unique
     * to identify this MediaStream across multiple RTCPeerConnections and to
     * unambiguously differentiate it from a local MediaStream instance not added
     * to an RTCPeerConnection.
     */
    _reactTag: string;
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
    constructor(arg: any);
    addTrack(track: MediaStreamTrack): void;
    removeTrack(track: MediaStreamTrack): void;
    getTracks(): Array<MediaStreamTrack>;
    getTrackById(trackId: any): MediaStreamTrack | undefined;
    getAudioTracks(): Array<MediaStreamTrack>;
    getVideoTracks(): Array<MediaStreamTrack>;
    clone(): void;
    toURL(): string;
    release(releaseTracks?: boolean): void;
}
export {};
