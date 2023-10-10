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
exports.NoteHandler = void 0;
class NoteHandler {
    constructor(storage) {
        this._storage = storage;
    }
    add(...items) {
        return __awaiter(this, void 0, void 0, function* () {
            return items.map(item => this._storage.addSync(item));
        });
    }
    update(...items) {
        return __awaiter(this, void 0, void 0, function* () {
            return items.map(item => this._storage.updateSync(item));
        });
    }
    remove(...items) {
        return items.map(item => this._storage.removeSync(item));
    }
    removeById(...ids) {
        return ids.map(id => this._storage.removeByIdSync(id));
    }
    searchById(...ids) {
        return ids.map(id => this._storage.getByIdSync(id))
            .filter(x => x !== undefined);
    }
    searchByText(text) {
        return this._storage.getByText(text);
    }
    getAll() {
        return this._storage.getAll();
    }
}
exports.NoteHandler = NoteHandler;
