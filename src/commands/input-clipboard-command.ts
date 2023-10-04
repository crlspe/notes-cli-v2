import { BaseCommand } from "./base-command";
import { Factory } from "../models/factory";
const ncp = require('node-clipboardy');

export class ClipboardInputCommand extends BaseCommand {
    
    async execute(options : {[key:string] : any}) {
        const inputs = [ncp.readSync()];
        this._results = inputs.map(input => Factory.newFromCLI(input));
        return await super.execute(options);
    }
}