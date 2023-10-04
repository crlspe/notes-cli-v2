"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const cli_1 = require("../utils/cli");
const { debug } = cli_1.cli.flags;
function log(...info) {
    debug && info.forEach(log => { console.table(log); });
}
exports.log = log;
