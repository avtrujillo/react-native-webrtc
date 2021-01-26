export default class RTCSessionDescription {
    sdp: string;
    type: string | null;
    constructor(info?: {
        type: null;
        sdp: string;
    });
    toJSON(): {
        sdp: string;
        type: string | null;
    };
}
