declare type RTCDataChannelInit = {
    ordered?: boolean;
    maxPacketLifeTime?: number;
    maxRetransmits?: number;
    protocol?: string;
    negotiated?: boolean;
    id?: number;
    maxRetransmitTime?: number;
};
declare type RTCDataChannelState = 'connecting' | 'open' | 'closing' | 'closed';
declare const RTCDataChannel_base: any;
export default class RTCDataChannel extends RTCDataChannel_base {
    _peerConnectionId: number;
    binaryType: 'arraybuffer';
    bufferedAmount: number;
    bufferedAmountLowThreshold: number;
    id?: number;
    label: string;
    maxPacketLifeTime?: number | null;
    maxRetransmits?: number | null;
    negotiated: boolean;
    ordered: boolean;
    protocol: string;
    readyState: RTCDataChannelState;
    onopen?: Function;
    onmessage?: Function;
    onbufferedamountlow?: Function;
    onerror?: Function;
    onclose?: Function;
    constructor(peerConnectionId: number, label: string, dataChannelDict: RTCDataChannelInit);
    send(data: string | ArrayBuffer | ArrayBufferView): void;
    close(): void;
    _unregisterEvents(): void;
    _registerEvents(): void;
}
export {};
