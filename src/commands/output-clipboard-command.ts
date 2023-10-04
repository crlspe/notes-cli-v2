import { Note } from "../models/note";
import { Task } from "../models/task";
import { BaseCommand } from "./base-command";
const ncp = require('node-clipboardy');

export class ClipboardOutputCommand extends BaseCommand {
    async execute(items: Array<Note|Task>): Promise<any[]> {
        this._results = items.map(item => `${item.formatedJSON(9999999999999).content}`);
        ncp.writeSync(this._results.join('\n'));
        return super.execute(items);
    }
}