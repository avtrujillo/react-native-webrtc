export default class MediaStreamError {
    name: string;
    message?: string;
    constraintName?: string;
    constructor(error: Error & {
        constraintName?: any;
    });
}
