import path from 'path';
import { getCurrentWorkingDirPath, readJson, writeJson } from './fileUtils.js';

const dataFilePath = 'data/sample-data.json';

export function readDataFile(){
    return readJson(path.join(getCurrentWorkingDirPath(), dataFilePath));
}

export function writeDataFile(options){
    return new Promise( (resolve, reject) => {
        try{
            return writeJson(path.join(getCurrentWorkingDirPath(), dataFilePath), options);
        } catch(e){
            reject('Error: ' + e.message);
        }
    });
}