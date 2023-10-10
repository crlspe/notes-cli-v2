"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOutputCommand = void 0;
const base_command_1 = require("./base-command");
const fs_1 = require("fs");
const cli_1 = require("../utils/cli");
const EXT = ".md";
const TRUNCATE_AT = 9999999999;
class FileOutputCommand extends base_command_1.BaseCommand {
    execute(items) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this._results = items
                .map(item => item.formatedJSON(TRUNCATE_AT))
                .map(item => format(item));
            const fileName = (cli_1.cli.flags.fileName) ? cli_1.cli.flags.fileName : `${Date.now().toString()}`;
            (0, fs_1.writeFileSync)(`./${fileName}${EXT}`, this._results.join('\n'));
            return _super.execute.call(this, items);
        });
    }
}
exports.FileOutputCommand = FileOutputCommand;
function format(item) {
    let completed = "";
    if (item.completed) {
        completed = (item.completed)
            ? "[x]"
            : "[ ]";
    }
    let scopes = "";
    console.log(item.scopes);
    if (item.scopes) {
        scopes = `@(${item.scopes})`;
    }
    let tags = "";
    if (item.tags) {
        tags = `#(${item.tags})`;
    }
    return `- ${completed}\t${item.content}\t${item.created}\t${scopes}\t${tags}`;
}
