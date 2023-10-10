import { Note } from "../models/note";
import { Task } from "../models/task";
import { BaseCommand } from "./base-command";

export class CliOutputCommand extends BaseCommand {
    async execute(items: Array<Note|Task>): Promise<any[]> {
        if (items.length > 0) 
            console.table(items.map(item => item.formatedJSON()));
        console.log(`(${items.length}) items...`)
        return super.execute(items);
    }
}