'use strict';

import {RTCIceCandidate} from './RTCIceCandidate';

export class RTCIceCandidateEvent {
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
