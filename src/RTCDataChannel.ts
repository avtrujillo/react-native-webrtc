'use strict';

import { NativeModules } from 'react-native';
import base64 from 'base64-js';
import {EventTarget} from 'event-target-shim';
import {MessageEvent} from './MessageEvent';
import {RTCDataChannelEvent} from './RTCDataChannelEvent';
import {EventEmitter} from './EventEmitter';

const {WebRTCModule} = NativeModules;

export type RTCDataChannelInit = {
  ordered?: boolean;
  maxPacketLifeTime?: number;
  maxRetransmits?: number;
  protocol?: string;
  negotiated?: boolean;
  id?: number;
  // deprecated:
  maxRetransmitTime?: number,
};

export type RTCDataChannelState =
  'connecting' |
  'open' |
  'closing' |
  'closed';

export const DATA_CHANNEL_EVENTS = [
  'open',
  'message',
  'bufferedamountlow',
  'close',
  'error',
];

class ResourceInUse extends Error {}

export class RTCDataChannel extends EventTarget { //(DATA_CHANNEL_EVENTS) {

  _peerConnectionId: number;

  binaryType: 'arraybuffer' = 'arraybuffer'; // we only support 'arraybuffer'
  bufferedAmount: number = 0;
  bufferedAmountLowThreshold: number = 0;
  id?: number;
  label: string;
  maxPacketLifeTime?: number | null = null;
  maxRetransmits?: number | null = null;
  negotiated: boolean = false;
  ordered: boolean = true;
  protocol: string = '';
  readyState: RTCDataChannelState = 'connecting';

  onopen?: Function;
  onmessage?: Function;
  onbufferedamountlow?: Function;
  onerror?: Function;
  onclose?: Function;

  constructor(
      peerConnectionId: number,
      label: string,
      dataChannelDict: RTCDataChannelInit) {
    super();

    this._peerConnectionId = peerConnectionId;

    this.label = label;

    // The standard defines dataChannelDict as optional for
    // RTCPeerConnection#createDataChannel and that is how we have implemented
    // the method in question. However, the method will (1) allocate an
    // RTCDataChannel.id if the caller has not specified a value and (2)
    // pass it to RTCDataChannel's constructor via dataChannelDict.
    // Consequently, dataChannelDict is not optional for RTCDataChannel's
    // constructor.
    this.id = ('id' in dataChannelDict) ? dataChannelDict.id : -1;
    this.ordered = !!dataChannelDict.ordered;
    this.maxPacketLifeTime = dataChannelDict.maxPacketLifeTime;
    this.maxRetransmits = dataChannelDict.maxRetransmits;
    this.protocol = dataChannelDict.protocol || '';
    this.negotiated = !!dataChannelDict.negotiated;

    //this._registerEvents(); // TODO
  }

  send(data: string | ArrayBuffer | ArrayBufferView) {
    if (typeof data === 'string') {
      WebRTCModule.dataChannelSend(this._peerConnectionId, this.id, data, 'text');
      return;
    }

    let uint8data: Uint8Array;

    // Safely convert the buffer object to an Uint8Array for base64-encoding
    if (ArrayBuffer.isView(data)) {
      uint8data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    } else if (data instanceof ArrayBuffer) {
      uint8data = new Uint8Array(data);
    } else {
      throw new TypeError('Data must be either string, ArrayBuffer, or ArrayBufferView');
    }
    WebRTCModule.dataChannelSend(this._peerConnectionId, this.id, base64.fromByteArray(uint8data), 'binary');
  }

  close() {
    if (this.readyState === 'closing' || this.readyState === 'closed') {
      return;
    }
    this.readyState = 'closing';
    WebRTCModule.dataChannelClose(this._peerConnectionId, this.id);
  }

  // _unregisterEvents() {
  //   this._subscriptions.forEach((e: any) => e.remove());
  //   this._subscriptions = [];
  // }

  // _registerEvents() {
  //   this._subscriptions = [
  //     EventEmitter.addListener('dataChannelStateChanged', ev => {
  //       if (ev.peerConnectionId !== this._peerConnectionId
  //           || ev.id !== this.id) {
  //         return;
  //       }
  //       this.readyState = ev.state;
  //       if (this.readyState === 'open') {
  //         this.dispatchEvent(new RTCDataChannelEvent('open', {channel: this}));
  //       } else if (this.readyState === 'closed') {
  //         this.dispatchEvent(new RTCDataChannelEvent('close', {channel: this}));
  //         this._unregisterEvents();
  //       }
  //     }),
  //     EventEmitter.addListener('dataChannelReceiveMessage', ev => {
  //       if (ev.peerConnectionId !== this._peerConnectionId
  //           || ev.id !== this.id) {
  //         return;
  //       }
  //       let data = ev.data;
  //       if (ev.type === 'binary') {
  //         data = base64.toByteArray(ev.data).buffer;
  //       }
  //       this.dispatchEvent(new MessageEvent('message', {data}));
  //     }),
  //   ];
  // }

}
