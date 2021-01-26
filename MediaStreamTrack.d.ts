declare type MediaStreamTrackState = "live" | "ended";
declare const MediaStreamTrack_base: any;
declare class MediaStreamTrack extends MediaStreamTrack_base {
    _constraints: Object;
    _enabled: boolean;
    id: string;
    kind: string;
    label: string;
    muted: boolean;
    readyState: MediaStreamTrackState;
    remote: boolean;
    onended?: Function;
    onmute?: Function;
    onunmute?: Function;
    overconstrained?: Function;
    constructor(info: any);
    get enabled(): boolean;
    set enabled(enabled: boolean);
    stop(): void;
    /**
     * Private / custom API for switching the cameras on the fly, without the
     * need for adding / removing tracks or doing any SDP renegotiation.
     *
     * This is how the reference application (AppRTCMobile) implements camera
     * switching.
     */
    _switchCamera(): void;
    applyConstraints(): void;
    clone(): void;
    getCapabilities(): void;
    getConstraints(): any;
    getSettings(): void;
    release(): void;
}
export default MediaStreamTrack;
