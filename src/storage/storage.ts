import { Note } from "../models/note";
import { Task } from "../models/task";

export interface BaseStorage {

    saveSync(data: Object) : void;

    addSync(item : Note|Task) : Note|Task;

    updateSync(item : Note|Task) : Note|Task;
    removeSync(item : Note|Task) : Note|Task;
    removeByIdSync(id : number) : number;

    getAll() : Array<Note|Task>;
    getByIdSync(id : number) : Note|Task|undefined;
    getByText(text : string) : Array<Note|Task>;
}