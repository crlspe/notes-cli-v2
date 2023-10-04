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
exports.SearchCommand = void 0;
const base_command_1 = require("./base-command");
class SearchCommand extends base_command_1.BaseCommand {
    execute(terms) {
        const _super = Object.create(null, {
            execute: { get: () => super.execute }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (terms.length == 0) {
                this._results = this._noteHandler.getAll();
            }
            terms.forEach(text => {
                const searchResults = this._noteHandler.searchByText(text);
                this._results = this._results.filter(x => searchResults.every(result => result.id !== x.id));
                this._results = this._results.concat(searchResults);
            });
            return yield _super.execute.call(this, terms);
        });
    }
}
exports.SearchCommand = SearchCommand;
