'use strict';

import RTCPeerConnection from './RTCPeerConnection';
import RTCIceCandidate from './RTCIceCandidate';
import RTCSessionDescription from './RTCSessionDescription';
import RTCView from './RTCView';
import MediaStream from './MediaStream';
import MediaStreamTrack from './MediaStreamTrack';
import mediaDevices from './MediaDevices';
import permissions from './Permissions';

export {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  permissions,
  registerGlobals
};

function registerGlobals() {
	// Should not happen. React Native has a global navigator object.
	if (typeof navigator !== 'object') {
		throw new Error('navigator is not an object');
	}

	if (!navigator.mediaDevices) {
		// @ts-ignore
		navigator.mediaDevices = {};
	}
	// @ts-ignore
	navigator.mediaDevices.getUserMedia =
		mediaDevices.getUserMedia.bind(mediaDevices);
	// @ts-ignore
	navigator.mediaDevices.enumerateDevices =
		mediaDevices.enumerateDevices.bind(mediaDevices);
	// @ts-ignore
	global.RTCPeerConnection     = RTCPeerConnection;
	// @ts-ignore
	global.RTCIceCandidate       = RTCIceCandidate;
	// @ts-ignore
	global.RTCSessionDescription = RTCSessionDescription;
	// @ts-ignore
	global.MediaStream           = MediaStream;
	// @ts-ignore
	global.MediaStreamTrack      = MediaStreamTrack;
}
