'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayMedia = void 0;
const react_native_1 = require("react-native");
const MediaStream_1 = require("./MediaStream");
const MediaStreamError_1 = require("./MediaStreamError");
const { WebRTCModule } = react_native_1.NativeModules;
function getDisplayMedia(constraints) {
    if (react_native_1.Platform.OS !== 'android') {
        return Promise.reject(new Error('Unsupported platform'));
    }
    if (!constraints || !constraints.video) {
        return Promise.reject(new TypeError());
    }
    return new Promise((resolve, reject) => {
        WebRTCModule.getDisplayMedia()
            .then((data) => {
            const { streamId, track } = data;
            const info = {
                streamId: streamId,
                streamReactTag: streamId,
                tracks: [track]
            };
            const stream = new MediaStream_1.MediaStream(info);
            resolve(stream);
        }, (error) => {
            reject(new MediaStreamError_1.MediaStreamError(error));
        });
    });
}
exports.getDisplayMedia = getDisplayMedia;
