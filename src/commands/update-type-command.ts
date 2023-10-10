import { Note } from "../models/note";
import { Task } from "../models/task";
import { cli } from "../utils/cli";
import { BaseCommand } from "./base-command";
import { Factory } from "../models/factory";

export class UpdateTypeCommand extends BaseCommand{
    private _toTask : boolean;

    constructor(toTask = false) {
        super();
        this._toTask = !!cli.flags.task || toTask;
    }

    async execute(items : Array<any>): Promise<Array<Note|Task>> {
        this._results = items
            .map(item => { 
                item.type =  (this._toTask) ? 'task' : 'note';
                return Factory.fromJSON(item.getJSON());
        });
        await this._noteHandler.update(...this._results);

        return await super.execute(items);
    }
}