'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaStreamError = void 0;
class MediaStreamError {
    constructor(error) {
        this.name = error.name;
        this.message = error.message;
        this.constraintName = error.constraintName;
    }
}
exports.MediaStreamError = MediaStreamError;
