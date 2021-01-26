'use strict';

import {RTCDataChannel} from './RTCDataChannel';

export class RTCDataChannelEvent {
  type: string;
  channel?: RTCDataChannel;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
