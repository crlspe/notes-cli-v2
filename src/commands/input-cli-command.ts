import { BaseCommand } from "./base-command";
import { CliInput } from "../utils/input";
import { Factory } from "../models/factory";

export class CliInputCommand extends BaseCommand {
    
    async execute(options : {[key:string] : any}) {

        const inputs = await CliInput.askList(options.index,options.label);
        this._results = (options.isNew) 
                            ? inputs.map(input => Factory.newFromCLI(input))
                            : inputs;
        return await super.execute(options);
    }
}