'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = exports.Permissions = void 0;
const react_native_1 = require("react-native");
const { WebRTCModule } = react_native_1.NativeModules;
/**
 * Class implementing a subset of W3C's Permissions API as defined by:
 * https://www.w3.org/TR/permissions/
 */
class Permissions {
    constructor() {
        /**
         * Possible result values for {@link query}, in accordance with:
         * https://www.w3.org/TR/permissions/#status-of-a-permission
         */
        this.RESULT = {
            DENIED: 'denied',
            GRANTED: 'granted',
            PROMPT: 'prompt'
        };
        /**
         * This implementation only supports requesting these permissions, a subset
         * of: https://www.w3.org/TR/permissions/#permission-registry
         */
        this.VALID_PERMISSIONS = ['camera', 'microphone'];
        this._lastReq = Promise.resolve();
    }
    /**
     * Helper for requesting Android permissions. On Android only one permission
     * can be requested at a time (unless the multi-permission API is used,
     * but we are not using that for symmetry with the W3C API for querying)
     * so we'll queue them up.
     *
     * @param {string} perm - The requested permission from
     * {@link PermissionsAndroid.PERMISSIONS}
     * https://facebook.github.io/react-native/docs/permissionsandroid#permissions-that-require-prompting-the-user
     */
    _requestPermissionAndroid(perm) {
        return new Promise((resolve, reject) => {
            react_native_1.PermissionsAndroid.request(perm).then(
            // @ts-ignore
            granted => resolve(granted === true || granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED), () => resolve(false));
        });
    }
    /**
     * Validates the given permission descriptor.
     */
    _validatePermissionDescriptior(permissionDesc) {
        if (typeof permissionDesc !== "object") {
            throw new TypeError("Argument 1 of Permissions.query is not an object.");
        }
        if (typeof permissionDesc.name === "undefined") {
            throw new TypeError("Missing required 'name' member of PermissionDescriptor.");
        }
        if (this.VALID_PERMISSIONS.indexOf(permissionDesc.name) === -1) {
            throw new TypeError("'name' member of PermissionDescriptor is not a valid value for enumeration PermissionName.");
        }
    }
    /**
     * Method for querying the status of a permission, according to:
     * https://www.w3.org/TR/permissions/#permissions-interface
     */
    query(permissionDesc) {
        try {
            this._validatePermissionDescriptior(permissionDesc);
        }
        catch (e) {
            return Promise.reject(e);
        }
        if (react_native_1.Platform.OS === 'android') {
            const perm = permissionDesc.name === 'camera'
                ? react_native_1.PermissionsAndroid.PERMISSIONS.CAMERA
                : react_native_1.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
            return new Promise((resolve, reject) => {
                react_native_1.PermissionsAndroid.check(perm).then(granted => resolve(granted ? this.RESULT.GRANTED : this.RESULT.PROMPT), () => resolve(this.RESULT.PROMPT));
            });
        }
        else if (react_native_1.Platform.OS === 'ios' || react_native_1.Platform.OS === 'macos') {
            return WebRTCModule.checkPermission(permissionDesc.name);
        }
        else {
            return Promise.reject(new TypeError("Unsupported platform."));
        }
    }
    /**
     * Custom method NOT defined by W3C's permissions API, which allows the
     * caller to request a permission.
     */
    request(permissionDesc) {
        try {
            this._validatePermissionDescriptior(permissionDesc);
        }
        catch (e) {
            return Promise.reject(e);
        }
        if (react_native_1.Platform.OS === 'android') {
            const perm = permissionDesc.name === 'camera'
                ? react_native_1.PermissionsAndroid.PERMISSIONS.CAMERA
                : react_native_1.PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
            const requestPermission = () => this._requestPermissionAndroid(perm);
            // @ts-ignore
            this._lastReq
                = this._lastReq.then(requestPermission, requestPermission);
            return this._lastReq;
        }
        else if (react_native_1.Platform.OS === 'ios' || react_native_1.Platform.OS === 'macos') {
            return WebRTCModule.requestPermission(permissionDesc.name);
        }
        else {
            return Promise.reject(new TypeError("Unsupported platform."));
        }
    }
}
exports.Permissions = Permissions;
exports.permissions = new Permissions();
