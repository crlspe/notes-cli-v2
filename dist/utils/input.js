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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliInput = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const cli_1 = require("./cli");
class CliInput {
    static getIds() {
        return [].concat(cli_1.cli.flags.id);
    }
    static askIfNull(input, message) {
        return __awaiter(this, void 0, void 0, function* () {
            input = input === null || input === undefined ? '' : input.toString();
            let value = input || (yield inquirer_1.default.prompt({
                type: 'input',
                name: 'value',
                message
            })).value;
            return value.trim();
        });
    }
    static ask(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield inquirer_1.default.prompt({
                type: 'input',
                name: 'value',
                message
            })).value.trim();
        });
    }
    static askList(index, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputs = cli_1.cli.input.slice(index);
            if (inputs.length > 0)
                return inputs;
            let content = "";
            do {
                content = yield this.ask(message);
                content && inputs.push(content);
            } while (content);
            return inputs;
        });
    }
}
exports.CliInput = CliInput;
