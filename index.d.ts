export * from './RTCPeerConnection';
export * from './RTCIceCandidate';
export * from './RTCSessionDescription';
import RTCView from './RTCView';
export * from './MediaStream';
export * from './MediaStreamTrack';
export * from './getUserMedia';
export * from './getDisplayMedia';
export { RTCDataChannel } from './RTCDataChannel';
export * from './RTCIceCandidate';
import mediaDevices from './MediaDevices';
import permissions from './Permissions';
export { RTCView, mediaDevices, permissions, registerGlobals };
declare function registerGlobals(): void;
