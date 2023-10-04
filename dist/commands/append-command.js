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
exports.AppendCommand = void 0;
const input_1 = require("../utils/input");
const base_command_1 = require("./base-command");
class AppendCommand extends base_command_1.BaseCommand {
    execute(items) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (items) {
                const append = yield input_1.CliInput.ask("append: ");
                const updatedItems = items.map(item => {
                    item.content = `${append} ${item.content.trim()}`;
                    return item;
                });
                this._results = yield this._noteHandler.update(...updatedItems);
            }
            return yield _super.execute.call(this, items);
        });
    }
}
exports.AppendCommand = AppendCommand;
