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

interface iFileLineItem {
    completed?: boolean;
    content: string;
    created: string;
    scopes?: string;
    tags?: string;
  }
  
  function format(item: iFileLineItem): string {
    const completedStr = item.completed ? "[x]" : "[ ]";
    const scopesStr = item.scopes ? `@(${item.scopes})` : "";
    const tagsStr = item.tags ? `#(${item.tags})` : "";
    
    let line = [
        completedStr,
        item.content,
        item.created,
        scopesStr,
        tagsStr
    ];

    return `- ${line.join('\t')}`;
  }