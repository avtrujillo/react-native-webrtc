export default class MessageEvent {
    type: string;
    data?: string | ArrayBuffer | Blob;
    origin?: string;
    constructor(type: any, eventInitDict: any);
}
