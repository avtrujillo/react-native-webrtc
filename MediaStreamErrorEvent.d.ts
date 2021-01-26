import type { MediaStreamError } from './MediaStreamError';
export declare class MediaStreamErrorEvent {
    type: string;
    error?: MediaStreamError;
    constructor(type: any, eventInitDict: any);
}
