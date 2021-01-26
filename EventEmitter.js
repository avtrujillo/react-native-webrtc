import { NativeModules, NativeEventEmitter } from 'react-native';
const { WebRTCModule } = NativeModules;
export const EventEmitter = new NativeEventEmitter(WebRTCModule);
