'use strict';
export default class MediaStreamError {
    constructor(error) {
        this.name = error.name;
        this.message = error.message;
        this.constraintName = error.constraintName;
    }
}
