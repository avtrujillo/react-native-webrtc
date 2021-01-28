import { EventTarget } from 'event-target-shim';
export declare class MediaDevices extends EventTarget {
    ondevicechange: ?Function;
    /**
     * W3C "Media Capture and Streams" compatible {@code enumerateDevices}
     * implementation.
     */
    enumerateDevices(): Promise<unknown>;
    /**
     * W3C "Screen Capture" compatible {@code getDisplayMedia} implementation.
     * See: https://w3c.github.io/mediacapture-screen-share/
     *
     * @param {*} constraints
     * @returns {Promise}
     */
    getDisplayMedia(constraints: any): Promise<unknown>;
    /**
     * W3C "Media Capture and Streams" compatible {@code getUserMedia}
     * implementation.
     * See: https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-enumeratedevices
     *
     * @param {*} constraints
     * @returns {Promise}
     */
    getUserMedia(constraints: any): Promise<import("./MediaStream").MediaStream>;
}
