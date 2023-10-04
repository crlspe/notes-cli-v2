import { Note } from "../models/note";
import { Task } from "../models/task";
import { BaseStorage } from "../storage/storage";

export class NoteHandler { 

    private _storage : BaseStorage;
    
    constructor(storage : BaseStorage) {
        this._storage = storage;
    }

    async add(...items : Array<Note|Task>) {
		return items.map(item => this._storage.addSync(item));
	}

    async update(...items : Array<Note|Task>) {
        return items.map(item => this._storage.updateSync(item));
    }

    async remove(...items : Array<Note|Task>) : Promise<Array<Note|Task>> {
		return await Promise.all(
            items.map(item => this._storage.remove(item))
        );
	}

    async removeById(...ids : Array<number>) : Promise<Array<number>> {
        return await Promise.all(
            ids.map(id => this._storage.removeById(id))
        );
    }

    searchById(...ids : Array<number>) {
		return ids.map(id => this._storage.getByIdSync(id))
               .filter(x => x!==undefined);
	}

    searchByText(text : string) : Array<Note|Task> {
		return this._storage.getByText(text);
	}

    getAll() : Array<Note|Task> {
        return this._storage.getAll();
    }
}