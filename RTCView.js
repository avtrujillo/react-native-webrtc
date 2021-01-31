'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCView = void 0;
const react_native_1 = require("react-native");
// import requireNativeComponent from 'requireNativeComponent';
const prop_types_1 = __importDefault(require("prop-types"));
const { WebRTCModule } = react_native_1.NativeModules;
const RTCVideoView = {
    name: 'RTCVideoView',
    propTypes: {
        /**
         * Indicates whether the video specified by {@link #streamURL} should be
         * mirrored during rendering. Commonly, applications choose to mirror the
         * user-facing camera.
         */
        mirror: prop_types_1.default.bool,
        /**
         * In the fashion of
         * https://www.w3.org/TR/html5/embedded-content-0.html#dom-video-videowidth
         * and https://www.w3.org/TR/html5/rendering.html#video-object-fit,
         * resembles the CSS style object-fit.
         */
        objectFit: prop_types_1.default.oneOf(['contain', 'cover']),
        streamURL: prop_types_1.default.string,
        /**
         * Similarly to the CSS property z-index, specifies the z-order of this
         * RTCView in the stacking space of all RTCViews. When RTCViews overlap,
         * zOrder determines which one covers the other. An RTCView with a larger
         * zOrder generally covers an RTCView with a lower one.
         *
         * Non-overlapping RTCViews may safely share a z-order (because one does not
         * have to cover the other).
         *
         * The support for zOrder is platform-dependent and/or
         * implementation-specific. Thus, specifying a value for zOrder is to be
         * thought of as giving a hint rather than as imposing a requirement. For
         * example, video renderers such as RTCView are commonly implemented using
         * OpenGL and OpenGL views may have different numbers of layers in their
         * stacking space. Android has three: a layer bellow the window (aka
         * default), a layer bellow the window again but above the previous layer
         * (aka media overlay), and above the window. Consequently, it is advisable
         * to limit the number of utilized layers in the stacking space to the
         * minimum sufficient for the desired display. For example, a video call
         * application usually needs a maximum of two zOrder values: 0 for the
         * remote video(s) which appear in the background, and 1 for the local
         * video(s) which appear above the remote video(s).
         */
        zOrder: prop_types_1.default.number
    },
};
exports.RTCView = react_native_1.requireNativeComponent('RTCVideoView');
