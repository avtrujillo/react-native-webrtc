'use strict';

import {MediaStreamTrack} from './MediaStreamTrack';

export class MediaStreamTrackEvent extends Event {
  // type: string;
  track?: MediaStreamTrack;
  constructor(type: any, eventInitDict: any) {
    super(type, eventInitDict)
    // this.type = type.toString();
    // Object.assign(this, eventInitDict);
  }
}
