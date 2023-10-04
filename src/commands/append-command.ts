import { Note } from "../models/note";
import { Task } from "../models/task";
import { CliInput } from "../utils/input";
import { BaseCommand } from "./base-command";

export class AppendCommand extends BaseCommand{

    async execute(items : Array<Note>): Promise<Array<Note|Task>> {
        if (items) {
            const append = await CliInput.ask("append: ");
            const updatedItems = items.map(item => {
                item.content = `${append} ${item.content.trim()}`; 
                return item;
            });
            this._results = await this._noteHandler.update(...updatedItems);
        }
        return await super.execute(items);
    }
}