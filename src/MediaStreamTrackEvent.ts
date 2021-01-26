'use strict';

import type MediaStreamTrack from './MediaStreamTrack';

export default class MediaStreamTrackEvent {
  type: string;
  track?: MediaStreamTrack;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
