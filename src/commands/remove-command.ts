import { Note } from "../models/note";
import { Task } from "../models/task";
import { BaseCommand } from "./base-command";

export class RemoveCommand extends BaseCommand{

    async execute(items : Array<Note>): Promise<Array<Note|Task>> {
        console.log("chained:", items)
        if (items) {
            this._results = await this._noteHandler.remove(...items);
        }
        return await super.execute(items);
    }
}