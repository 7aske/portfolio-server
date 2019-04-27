"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bodyparser(req, res, next) {
    var data = "";
    req.on("data", function (chunk) {
        data += chunk;
    });
    req.on("end", function () {
        data = data.replace("%40", "@");
        if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
            req.body = parseUrlencoded(data);
        }
        else if (req.headers["content-type"] === "application/json") {
            req.body = parseJSON(data);
        }
        else {
            req.body = data;
        }
        next();
    });
}
exports.bodyparser = bodyparser;
function parseUrlencoded(data) {
    var out = {};
    var keyValPairs = data.split("&");
    keyValPairs.forEach(function (kv) {
        var fields = kv.split("=");
        if (fields.length === 2) {
            out[fields[0]] = fields[1];
        }
    });
    Object.freeze(out);
    return out;
}
function parseJSON(data) {
    return JSON.parse(data);
}
