'use strict';

import {RTCIceCandidate} from './RTCIceCandidate';

export class RTCIceCandidateEvent extends Event {
  // type: string;
  candidate?: RTCIceCandidate | null;
  constructor(type: any, eventInitDict: any) {
    super(type.toString(), eventInitDict)

    this.candidate = null;
    if (eventInitDict && eventInitDict.candidate) {
      this.candidate = eventInitDict.candidate;
    }
  }
}
