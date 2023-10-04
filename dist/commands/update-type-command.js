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
exports.UpdateTypeCommand = void 0;
const cli_1 = require("../utils/cli");
const base_command_1 = require("./base-command");
const factory_1 = require("../models/factory");
class UpdateTypeCommand extends base_command_1.BaseCommand {
    execute(items) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this._results = items
                .map(item => {
                item.type = (!!cli_1.cli.flags.task) ? 'task' : 'note';
                return factory_1.Factory.fromJSON(item.getJSON());
            });
            yield this._noteHandler.update(...this._results);
            return yield _super.execute.call(this, items);
        });
    }
}
exports.UpdateTypeCommand = UpdateTypeCommand;
