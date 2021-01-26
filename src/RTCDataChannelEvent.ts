'use strict';

import type RTCDataChannel from './RTCDataChannel';

export default class RTCDataChannelEvent {
  type: string;
  channel?: RTCDataChannel;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
