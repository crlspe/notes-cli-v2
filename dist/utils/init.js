"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const cli_welcome_1 = __importDefault(require("cli-welcome"));
const cli_1 = require("./cli");
const pkg = require('../../package.json');
const { clear } = cli_1.cli.flags;
function init() {
    (0, cli_welcome_1.default)({
        title: `notes-cli`,
        tagLine: `by Rafael Lopez`,
        // description: pkg.description,
        version: pkg.version,
        bgColor: '#36BB09',
        color: '#000000',
        bold: true,
        clear: clear
    });
}
exports.init = init;
;
