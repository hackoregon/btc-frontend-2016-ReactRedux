'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeDataFile = exports.readDataFile = exports.getCurrentWorkingDirPath = exports.setCurrentWorkingDirPath = undefined;

var _fileUtils = require('./fileUtils.js');

var _serverData = require('./serverData.js');

exports.setCurrentWorkingDirPath = _fileUtils.setCurrentWorkingDirPath;
exports.getCurrentWorkingDirPath = _fileUtils.getCurrentWorkingDirPath;
exports.readDataFile = _serverData.readDataFile;
exports.writeDataFile = _serverData.writeDataFile;