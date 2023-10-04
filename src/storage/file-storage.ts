import os = require('os');
import fs = require('fs');
import path = require('path');
import { BaseStorage } from './storage';

const dataFile = 'notes-data.json';
const homeDirectory = os.homedir();
const dataFilePath = path.join(homeDirectory, dataFile);

import { template } from '../config/config';
import { Note } from '../models/note';
import { Task } from '../models/task'
import { Factory } from '../models/factory';
import { log } from '../utils/log';

export class FileStorage implements BaseStorage {
    
    loadSync() {
        let jsonData = template;
		try {
			const strDataJSON = fs.readFileSync(dataFilePath, 'utf8');
			jsonData = JSON.parse(strDataJSON);
		} catch {}
		return jsonData;
    }

    saveSync(jsonData: Object) {
        fs.writeFileSync(dataFilePath, JSON.stringify(jsonData), 'utf8');
    }

    addSync(item: Note): Note {
        let jsonDb = this.loadSync();
		item.id = +jsonDb.id;
		jsonDb.data[jsonDb.id] = item;
		jsonDb.id++;
		this.saveSync(jsonDb);
        log("Added:", item);
		return item;
    }

    updateSync(item: Note): Note {
        let jsonData = this.loadSync();
		jsonData.data[item.id] = item;
		this.saveSync(jsonData);
		return item;
    }

    async remove(item: Note): Promise<Note> {
        this.removeById(item.id);
		return item;
    }

    async removeById(id : number)  {
        let jsonData = await this.loadSync();
		delete jsonData.data[id];
		await this.saveSync(jsonData);
		return id;
    }

    getAll(): Array<Note|Task> {
        let jsonData = this.loadSync().data;
        return Object.keys(jsonData)
                .map(x=>jsonData[x])
                .map(x=>Factory.fromJSON(x));
    }

    getByIdSync(id: number): Note|Task|undefined {
        let jsonData = this.loadSync().data;
        if (!jsonData[id]) return;
        return Factory.fromJSON(jsonData[id]);
    }

    getByText(text: string): Array<Note|Task> {
        let items = this.getAll();
        return items.filter(x=>x.content.includes(text));
    }
}