'use strict';

import type {MediaStreamError} from './MediaStreamError';

export class MediaStreamErrorEvent {
  type: string;
  error?: MediaStreamError;
  constructor(type: any, eventInitDict: any) {
    this.type = type.toString();
    Object.assign(this, eventInitDict);
  }
}
