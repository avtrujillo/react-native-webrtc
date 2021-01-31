"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const react_native_1 = require("react-native");
const { WebRTCModule } = react_native_1.NativeModules;
exports.EventEmitter = new react_native_1.NativeEventEmitter(WebRTCModule);
