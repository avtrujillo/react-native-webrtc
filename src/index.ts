'use strict';

export {
	RTCPeerConnection,
	RTCSignalingState,
	RTCIceGatheringState,
	RTCPeerConnectionState,
	RTCIceConnectionState,
} from './RTCPeerConnection';

export {RTCIceCandidate} from './RTCIceCandidate';
export {RTCSessionDescription} from './RTCSessionDescription';
export {RTCView} from './RTCView';
export {MediaStream} from './MediaStream';
export {
	MediaStreamTrack,
	MediaStreamTrackState
} from './MediaStreamTrack';
export {getUserMedia} from './getUserMedia';
export {getDisplayMedia} from './getDisplayMedia';
export {
	RTCDataChannel,
	RTCDataChannelInit,
	RTCDataChannelState
} from './RTCDataChannel';

export {MediaDevices} from './MediaDevices';
export {permissions, Permissions} from './Permissions';

// export {
//   RTCPeerConnection,
//   RTCIceCandidate,
//   RTCSessionDescription,
//   RTCView,
//   MediaStream,
//   MediaStreamTrack,
//   mediaDevices,
//   permissions,
//   registerGlobals
// };

export function registerGlobals() {
	// Should not happen. React Native has a global navigator object.
	if (typeof navigator !== 'object') {
		throw new Error('navigator is not an object');
	}

	if (!navigator.mediaDevices) {
		// @ts-ignore
		navigator.mediaDevices = {};
	}
	let mediaDevices = new MediaDevices()
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
