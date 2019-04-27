"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
function notFound(req, res, next) {
    res.status(404).sendFile(path_1.resolve(process.cwd(), "dist/static/pages/404.html"));
}
exports.notFound = notFound;
