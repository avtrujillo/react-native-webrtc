"use strict";
// 'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.macSwitch = void 0;
exports.macSwitch = '--use-react-native-macos';
if (process.argv.includes(exports.macSwitch)) {
    process.argv = process.argv.filter(arg => arg !== exports.macSwitch);
    process.argv.push('--config=metro.config.macos.js');
    module.exports = {
        reactNativePath: 'node_modules/react-native-macos',
    };
}
