import { log } from "../utils/log";
import { cli } from "../utils/cli";
import { commands, defaultOutput } from "../config/config";
import { AppendCommand } from "../commands/append-command";
import { CliOutputCommand } from "../commands/output-cli-command";
import { BaseCommand } from "../commands/base-command";
import { AddCommand } from "../commands/add-command";
import { ReplaceCommand } from "../commands/replace-command";

export class CommandHandler {

    private getInstance(cmd: never) {
        switch (cmd) {
            case "add":
                return new AddCommand();
            case "append":
                return new AppendCommand();
            case "replace":
                return new ReplaceCommand();
            default: 
                return new BaseCommand();
        }
    }
    private getCommands(commandList : Array<any>) {
        const noteCommands =  commandList.filter(command => {
            const commandFlags : { [key : string] : boolean} = command.flags;
            return Object.keys(command.flags).every(key => cli.flags[key] === commandFlags[key])
        });
        log("Note Commands Selected:", noteCommands);
        return noteCommands;        
    }
    async handle() {
        for (const command of this.getCommands(commands)) {
            
            // Inputs
            let inputResults = (await Promise.all(command.inputs.map((input : any) => (new input.command()).execute(input.options)))).flat();
            log("CLI Input Results:", inputResults);

            // Commands 
            let commandResults = await (new command.command()).execute(inputResults);
            log("Command Results:", commandResults);
            
            // Commands Specific Outputs 
            if (command.chains) { 
                commandResults = (await Promise.all(command.chains.map((output : any) => (new output.command()).execute(commandResults)))).flat();
            }
            
            // Output
            await Promise.all(this.getCommands(defaultOutput).map(output => (new output.command()).execute(commandResults)));

            // // Chained commands    
            const chain = [].concat(cli.flags.chain);
            chain.filter( cmd => cmd !== undefined )
                .map(cmd => this.getInstance(cmd))
                .map( async cmd => new CliOutputCommand().execute(await cmd.execute(commandResults)));
        }
    }
}


