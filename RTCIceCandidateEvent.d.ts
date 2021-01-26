import { RTCIceCandidate } from './RTCIceCandidate';
export declare class RTCIceCandidateEvent {
    type: string;
    candidate?: RTCIceCandidate | null;
    constructor(type: any, eventInitDict: any);
}
