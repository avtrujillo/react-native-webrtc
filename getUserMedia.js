'use strict';
import { NativeModules } from 'react-native';
import * as RTCUtil from './RTCUtil';
import { MediaStream } from './MediaStream';
import { MediaStreamError } from './MediaStreamError';
import { permissions } from './Permissions';
const { WebRTCModule } = NativeModules;
export function getUserMedia(rawConstraints = {}) {
    // According to
    // https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia,
    // the constraints argument is a dictionary of type MediaStreamConstraints.
    if (typeof rawConstraints !== 'object') {
        return Promise.reject(new TypeError('constraints is not a dictionary'));
    }
    if ((typeof rawConstraints.audio === 'undefined' || !rawConstraints.audio)
        && (typeof rawConstraints.video === 'undefined' || !rawConstraints.video)) {
        return Promise.reject(new TypeError('audio and/or video is required'));
    }
    // Normalize constraints.
    let constraints = RTCUtil.normalizeConstraints(rawConstraints);
    // Request required permissions
    const reqPermissions = [];
    if (constraints.audio) {
        reqPermissions.push(permissions.request({ name: 'microphone' }));
    }
    else {
        reqPermissions.push(Promise.resolve(false));
    }
    if (constraints.video) {
        reqPermissions.push(permissions.request({ name: 'camera' }));
    }
    else {
        reqPermissions.push(Promise.resolve(false));
    }
    return new Promise((resolve, reject) => {
        Promise.all(reqPermissions).then(results => {
            const [audioPerm, videoPerm] = results;
            // Check permission results and remove unneeded permissions.
            if (!audioPerm && !videoPerm) {
                // https://www.w3.org/TR/mediacapture-streams/#dom-mediadevices-getusermedia
                // step 4
                const error = {
                    message: 'Permission denied.',
                    name: 'SecurityError'
                };
                reject(new MediaStreamError(error));
                return;
            }
            audioPerm || (delete constraints.audio);
            videoPerm || (delete constraints.video);
            const success = (id, tracks) => {
                // TODO: make sure tracks is an array of tracks rather than a stream
                // Store initial constraints.
                let trackInfo;
                for (trackInfo of tracks) {
                    let c;
                    if (trackInfo.kind == 'audio') {
                        c = constraints.audio;
                    }
                    else {
                        c = constraints.video;
                    }
                    // const c = constraints[trackInfo.kind];
                    if (typeof c === 'object') {
                        trackInfo.constraints = RTCUtil.deepClone(c);
                    }
                }
                const info = {
                    streamId: id,
                    streamReactTag: id,
                    tracks
                };
                resolve(new MediaStream(info));
            };
            const failure = (type, message) => {
                let error;
                switch (type) {
                    case 'TypeError':
                        error = new TypeError(message);
                        break;
                }
                if (!error) {
                    error = new MediaStreamError({ message, name: type });
                }
                reject(error);
            };
            WebRTCModule.getUserMedia(constraints, success, failure);
        });
    });
}
