'use strict';

export class RTCSessionDescription {
  sdp: string;
  type: string | null;

  constructor(info = {type: null, sdp: ''}) {
    this.sdp = info.sdp;
    this.type = info.type;
  }
  toJSON() {
    return {sdp: this.sdp, type: this.type};
  }
}
