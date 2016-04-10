'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCurrentWorkingDirPath = setCurrentWorkingDirPath;
exports.getCurrentWorkingDirPath = getCurrentWorkingDirPath;
exports.readJson = readJson;
exports.writeJson = writeJson;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverWorkDirPath = '';

function setCurrentWorkingDirPath(dirPath) {
    serverWorkDirPath = dirPath;
}

function getCurrentWorkingDirPath() {
    return serverWorkDirPath;
}

function readJson(filePath) {
    return new Promise(function (resolve, reject) {
        _fsExtra2.default.readJson(filePath, function (err, packageObj) {
            if (err) {
                reject(err);
            } else {
                resolve(packageObj);
            }
        });
    });
}

function writeJson(filePath, jsonObj) {
    return new Promise(function (resolve, reject) {
        _fsExtra2.default.writeJson(filePath, jsonObj, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}