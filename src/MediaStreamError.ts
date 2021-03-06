'use strict';

export class MediaStreamError {

  name: string;
  message?: string;
  constraintName?: string;

  constructor(error: Error & {constraintName?: any}) {
    this.name = error.name;
    this.message = error.message;
    this.constraintName = error.constraintName;
  }
}
