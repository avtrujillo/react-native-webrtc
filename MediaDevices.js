'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDevices = void 0;
const react_native_1 = require("react-native");
const event_target_shim_1 = require("event-target-shim");
const getDisplayMedia_1 = require("./getDisplayMedia");
const getUserMedia_1 = require("./getUserMedia");
const { WebRTCModule } = react_native_1.NativeModules;
const MEDIA_DEVICES_EVENTS = [
    'devicechange'
];
class MediaDevices extends event_target_shim_1.EventTarget {
    /**
     * W3C "Media Capture and Streams" compatible {@code enumerateDevices}
     * implementation.
     */
    enumerateDevices() {
        return new Promise(resolve => WebRTCModule.enumerateDevices(resolve));
    }
    /**
     * W3C "Screen Capture" compatible {@code getDisplayMedia} implementation.
     * See: https://w3c.github.io/mediacapture-screen-share/
     *
     * @param {*} constraints
     * @returns {Promise}
     */
    getDisplayMedia(constraints) {
        return getDisplayMedia_1.getDisplayMedia(constraints);
    }
    /**
     * W3C "Media Capture and Streams" compatible {@code getUserMedia}
     * implementation.
     * See: https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-enumeratedevices
     *
     * @param {*} constraints
     * @returns {Promise}
     */
    getUserMedia(constraints) {
        return getUserMedia_1.getUserMedia(constraints);
    }
}
exports.MediaDevices = MediaDevices;
