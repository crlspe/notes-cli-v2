import { Note } from "../models/note";
import { Task } from "../models/task";
import { cli } from "../utils/cli";
import { BaseCommand } from "./base-command";

export class UpdateTaskCommand extends BaseCommand{

    async execute(items : Array<any>): Promise<Array<Note|Task>> {
        this._results = items
            .filter(item => item.type === "task")
            .map(task => task.setCompleted(cli.flags.check));
            
        await this._noteHandler.update(...this._results);

        return await super.execute(items);
    }
}
