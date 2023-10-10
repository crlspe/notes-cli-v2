import { Note } from "../models/note";
import { Task } from "../models/task";
import { cli } from "../utils/cli";
import { BaseCommand } from "./base-command";

export class UpdateTaskCommand extends BaseCommand{

    private _completed : boolean = cli.flags.check;

    constructor(completed = false) {
        super();
        this._completed = this._completed || completed;
    }

    async execute(items : Array<any>): Promise<Array<Note|Task>> {
        this._results = items
            .filter(item => item.type === "task")
            .map(task => task.setCompleted(this._completed));
            
        await this._noteHandler.update(...this._results);

        return await super.execute(items);
    }
}
