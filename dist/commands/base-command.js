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
exports.BaseCommand = void 0;
const note_handler_1 = require("../handlers/note-handler");
const file_storage_1 = require("../storage/file-storage");
const log_1 = require("../utils/log");
class BaseCommand {
    constructor() {
        this._noteHandler = new note_handler_1.NoteHandler(new file_storage_1.FileStorage());
        this._results = [];
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, log_1.log)(`Input > ${this.constructor.name}`, input);
            return this._results;
        });
    }
}
exports.BaseCommand = BaseCommand;
