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
exports.CliInputCommand = void 0;
const base_command_1 = require("./base-command");
const input_1 = require("../utils/input");
const factory_1 = require("../models/factory");
class CliInputCommand extends base_command_1.BaseCommand {
    execute(options) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const inputs = yield input_1.CliInput.askList(options.index, options.label);
            this._results = (options.isNew)
                ? inputs.map(input => factory_1.Factory.newFromCLI(input))
                : inputs;
            return yield _super.execute.call(this, options);
        });
    }
}
exports.CliInputCommand = CliInputCommand;
