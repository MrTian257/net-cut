const fs = require('fs');
const exec = require('child_process').exec;
const archiver = require('archiver');

let [_, _1, ...modulesParams] = process.argv
// fs.cpSync("", "")
