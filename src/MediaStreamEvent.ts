'use strict';

import {MediaStream} from './MediaStream';

export class MediaStreamEvent {
  type: string;
  stream?: MediaStream;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
