'use strict';

export default class RTCEvent {
  type: string;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
