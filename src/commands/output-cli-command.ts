import { Note } from "../models/note";
import { Task } from "../models/task";
import { BaseCommand } from "./base-command";

export class CliOutputCommand extends BaseCommand {
    async execute(items: Array<Note|Task>): Promise<any[]> {

        
        console.table(items.map(item => item.formatedJSON()));
        return super.execute(items);
    }
}