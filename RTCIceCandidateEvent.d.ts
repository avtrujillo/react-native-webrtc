import { RTCIceCandidate } from './RTCIceCandidate';
export declare class RTCIceCandidateEvent extends Event {
    candidate?: RTCIceCandidate | null;
    constructor(type: any, eventInitDict: any);
}
