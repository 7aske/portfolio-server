"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var invalidPaths = ["/.git", "package.json", "package-lock.json", ".gitignore"];
// TODO: lol not like this
function isPathValid(path) {
    if (path.startsWith("/.")) {
        return false;
    }
    for (var i = 0; i < invalidPaths.length; i++) {
        var p = invalidPaths[i];
        if (path.indexOf(p) != -1) {
            console.log(path, "mw");
            return false;
        }
    }
    return true;
}
function middleware(req, res, next) {
    if (isPathValid(req.path)) {
        next();
    }
    else {
        res.status(404).sendFile(path_1.resolve(process.cwd(), "dist/static/pages/404.html"));
    }
}
exports.middleware = middleware;
