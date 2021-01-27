'use strict';

import {MediaStream} from './MediaStream';

export class MediaStreamEvent extends Event {
  // type: string;
  stream?: MediaStream;
  constructor(type: any, eventInitDict: any) {
    super(type.toString(), eventInitDict)
    // this.type = type.toString();
    // Object.assign(this, eventInitDict);
  }
}
