'use strict';

import type RTCIceCandidate from './RTCIceCandidate';

export default class RTCIceCandidateEvent {
  type: string;
  candidate?: RTCIceCandidate | null;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();

    this.candidate = null;
    if (eventInitDict && eventInitDict.candidate) {
      this.candidate = eventInitDict.candidate;
    }
  }
}
