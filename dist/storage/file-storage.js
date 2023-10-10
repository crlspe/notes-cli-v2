"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const os = require("os");
const fs = require("fs");
const path = require("path");
const dataFile = 'notes-data.json';
const homeDirectory = os.homedir();
const dataFilePath = path.join(homeDirectory, dataFile);
const config_1 = require("../config/config");
const factory_1 = require("../models/factory");
const log_1 = require("../utils/log");
class FileStorage {
    loadSync() {
        let jsonData = config_1.template;
        try {
            const strDataJSON = fs.readFileSync(dataFilePath, 'utf8');
            jsonData = JSON.parse(strDataJSON);
        }
        catch (_a) { }
        return jsonData;
    }
    saveSync(jsonData) {
        fs.writeFileSync(dataFilePath, JSON.stringify(jsonData), 'utf8');
    }
    addSync(item) {
        let jsonDb = this.loadSync();
        item.id = +jsonDb.id;
        jsonDb.data[jsonDb.id] = item;
        jsonDb.id++;
        this.saveSync(jsonDb);
        (0, log_1.log)("Added:", item);
        return item;
    }
    updateSync(item) {
        let jsonData = this.loadSync();
        jsonData.data[item.id] = item;
        this.saveSync(jsonData);
        return item;
    }
    removeSync(item) {
        this.removeByIdSync(item.id);
        return item;
    }
    removeByIdSync(id) {
        let jsonData = this.loadSync();
        delete jsonData.data[id];
        this.saveSync(jsonData);
        return id;
    }
    getAll() {
        let jsonData = this.loadSync().data;
        return Object.keys(jsonData)
            .map(x => jsonData[x])
            .map(x => factory_1.Factory.fromJSON(x));
    }
    getByIdSync(id) {
        let jsonData = this.loadSync().data;
        if (!jsonData[id])
            return;
        return factory_1.Factory.fromJSON(jsonData[id]);
    }
    getByText(text) {
        let items = this.getAll();
        return items.filter(x => x.content.includes(text));
    }
}
exports.FileStorage = FileStorage;
