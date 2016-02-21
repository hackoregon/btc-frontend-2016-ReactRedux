import fs from 'fs-extra';

let serverWorkDirPath = '';

export function setCurrentWorkingDirPath(dirPath){
    serverWorkDirPath = dirPath;
}

export function getCurrentWorkingDirPath(){
    return serverWorkDirPath;
}

export function readJson(filePath){
    return new Promise( (resolve, reject) => {
        fs.readJson(filePath, (err, packageObj) => {
            if(err){
                reject(err);
            } else {
                resolve(packageObj);
            }
        });
    });
}

export function writeJson(filePath, jsonObj){
    return new Promise( (resolve, reject) => {
        fs.writeJson(filePath, jsonObj, err => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
