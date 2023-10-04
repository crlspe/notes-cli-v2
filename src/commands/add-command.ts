import { Note } from "../models/note";
import { BaseCommand } from "./base-command";

export class AddCommand extends BaseCommand {

    async execute(items : Array<any>): Promise<any[]> {
        this._results = await this._noteHandler.add(...items);
        return await super.execute(items);
    }
}