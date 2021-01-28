'use strict';

export class MessageEvent extends Event {
  // type: string;
  data?: string | ArrayBuffer | Blob;
  origin?: string;
  constructor(type: any, eventInitDict: any) {
    super(type, eventInitDict)
    // this.type = type.toString();
    // Object.assign(this, eventInitDict);
  }
}
