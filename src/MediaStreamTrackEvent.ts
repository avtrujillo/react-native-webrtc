'use strict';

import {MediaStreamTrack} from './MediaStreamTrack';

export class MediaStreamTrackEvent {
  type: string;
  track?: MediaStreamTrack;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
