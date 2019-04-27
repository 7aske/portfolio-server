"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var middleware_1 = require("./middleware/middleware");
var path_1 = require("path");
var mailer_1 = require("./middleware/mailer");
var bodyparser_1 = require("./middleware/bodyparser");
var notFound_1 = require("./middleware/notFound");
var updater_1 = require("./updater/updater");
var env = dotenv_1.default.config({ path: path_1.resolve(process.cwd(), "config/.env") });
if (env.error) {
    throw env.error;
}
else {
    console.log(env.parsed);
}
var server = express_1.default();
exports.MAILER_TIMEOUT = 60 * 60 * 1000;
exports.PORT = parseInt(process.env.PORT) || 3000;
exports.REPO_DIR = process.env.REPO_DIR || "dist/static";
exports.REPO_NAME = process.env.REPO_NAME || "portfolio";
setInterval(mailer_1.resetIps, exports.MAILER_TIMEOUT);
server.use(bodyparser_1.bodyparser);
server.use(middleware_1.middleware);
server.use("/api/mailer", mailer_1.mailer);
server.use("/api", express_1.default.static(exports.REPO_DIR + "/" + exports.REPO_NAME));
server.use(express_1.default.static(exports.REPO_DIR + "/" + exports.REPO_NAME));
server.use(notFound_1.notFound);
updater_1.update(exports.REPO_DIR, exports.REPO_NAME);
server.listen(exports.PORT, function () { return console.log("Server listening on port " + exports.PORT); });
