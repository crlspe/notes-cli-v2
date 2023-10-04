import { Note } from "../models/note";
import { Task } from "../models/task";
import { CliInput } from "../utils/input";
import { BaseCommand } from "./base-command";

export class ReplaceCommand extends BaseCommand{

    async execute(items : Array<Note>): Promise<Array<Note|Task>> {
        if (items) {
            const replace : string = await CliInput.ask("replace: ");
            let [ value, replaceValue ] = replace.split("|");
            const updatedItems = items.map(item => {
                item.content = item.content.trim().replace(value,replaceValue)
                return item;
            });
            this._results = await this._noteHandler.update(...updatedItems);
        }
        return await super.execute(items);
    }
}