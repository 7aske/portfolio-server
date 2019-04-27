"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var rmrf = function (path) {
    if (fs_1.existsSync(path)) {
        fs_1.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs_1.lstatSync(curPath).isDirectory()) {
                rmrf(curPath);
            }
            else {
                fs_1.unlinkSync(curPath);
            }
        });
        fs_1.rmdirSync(path);
    }
};
function update(dir, repo) {
    var pth = path_1.resolve(process.cwd(), dir);
    var pthRepo = path_1.resolve(pth, repo);
    if (fs_1.existsSync(pthRepo)) {
        rmrf(pthRepo);
    }
    child_process_1.execSync("git clone https://github.com/7aske/" + repo, { cwd: pth, stdio: 'inherit' });
}
exports.update = update;
