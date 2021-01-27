'use strict';

import {RTCDataChannel} from './RTCDataChannel';

export class RTCDataChannelEvent extends Event {
  // type: string;
  channel?: RTCDataChannel;
  constructor(type: any, eventInitDict: any) {
    super(type.toString(), eventInitDict)
    // this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
