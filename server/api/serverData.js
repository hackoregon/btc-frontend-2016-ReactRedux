'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readDataFile = readDataFile;
exports.writeDataFile = writeDataFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fileUtils = require('./fileUtils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataFilePath = 'data/states-defaults.json';

function readDataFile() {
    return (0, _fileUtils.readJson)(_path2.default.join((0, _fileUtils.getCurrentWorkingDirPath)(), dataFilePath));
}

function writeDataFile(options) {
    return new Promise(function (resolve, reject) {
        try {
            return (0, _fileUtils.writeJson)(_path2.default.join((0, _fileUtils.getCurrentWorkingDirPath)(), dataFilePath), options);
        } catch (e) {
            reject('Error: ' + e.message);
        }
    });
}