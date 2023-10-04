import { BaseCommand } from "./base-command";
import { writeFileSync } from "fs";
import { cli } from "../utils/cli";


const EXT = ".md";
const TRUNCATE_AT = 9999999999;
export class FileOutputCommand extends BaseCommand {
    async execute(items: Array<any>): Promise<any[]> {
        this._results = items
        .map(item => item.formatedJSON(TRUNCATE_AT))
        .map(item => format(item));
        const fileName = (cli.flags.fileName) ? cli.flags.fileName : `${Date.now().toString()}`
        writeFileSync(`./${fileName}${EXT}`, this._results.join('\n'));
        return super.execute(items);
    }
}

function format(item:any) { 
    let completed = "";
    if (item.completed) {
        completed = (item.completed) 
            ? "[x]"
            : "[ ]";
    } 
    let scopes = "";
    console.log(item.scopes)
    if (item.scopes) {
        scopes = `@(${item.scopes})`
    }
    let tags = "";
    if (item.tags) {
        tags = `#(${item.tags})`;
    }

    return `- ${completed}\t${item.content}\t${item.created}\t${scopes}\t${tags}`
}