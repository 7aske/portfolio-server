"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var nodemailer_1 = __importDefault(require("nodemailer"));
function mailer(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.method.toUpperCase() == "POST")) return [3 /*break*/, 4];
                    if (!(req.body.hasOwnProperty("name")
                        && req.body.hasOwnProperty("email")
                        && req.body.hasOwnProperty("message"))) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sendMail(req.body)];
                case 2:
                    _a.sent();
                    res.status(200).sendFile(path_1.resolve(process.cwd(), "dist/static/pages/mail_success.html"));
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    res.status(400).sendFile(path_1.resolve(process.cwd(), "dist/static/pages/mail_error.html"));
                    return [3 /*break*/, 4];
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mailer = mailer;
var sendMail = function (body) { return __awaiter(_this, void 0, void 0, function () {
    var username, password, mailto, transporter, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = process.env.MAILER_USERNAME;
                password = process.env.MAILER_PASSWORD;
                mailto = process.env.MAILER_SENDTO;
                transporter = nodemailer_1.default.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: username,
                        pass: password,
                    },
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: "\"Portfolio Mailer \uD83E\uDD16\" <" + username + "@gmail.com>",
                        to: mailto,
                        subject: "Portfolio Message ✔",
                        text: body["name"] + " " + body["email"] + "\n" + body["message"],
                        html: htmlTemplate(body),
                    })];
            case 1:
                info = _a.sent();
                console.log("Message sent: %s", info.messageId);
                return [2 /*return*/];
        }
    });
}); };
function htmlTemplate(body) {
    return "<!doctype html>\n\t<html lang=\"en\">\n\t<head>\n    <style>\n        body, html {\n            margin: 0;\n            padding: 0;\n            font-family: Helvetica, sans-serif;\n\t\t\twidth: 500px;\n        }\n        .body {\n            margin: 10px;\n            padding: 10px;\n            background-color: #f5f5f5f5;\n            border: 2px solid #aaaaaa;\n            border-radius: 7px;\n        }\n        .body p {\n            width: 500px;\n        }\n        .body h3 {\n            font-weight: normal;\n        }\n\n        .body h3 i {\n            font-weight: 700;\n        }\n    </style>\n</head>\n<body>\n<div class=\"body\">\n    <h3>" + body["name"] + " <i>" + body["email"] + "</i></h3>\n    <h5>Message:</h5>\n    <p>" + body["message"] + "</p>\n</div>\n</body>\n</html>";
}
