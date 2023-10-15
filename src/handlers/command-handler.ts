import { log } from "../utils/log";
import { cli } from "../utils/cli";
import { commands, defaultOutput } from "../config/config";
import { AppendCommand } from "../commands/append-command";
import { CliOutputCommand } from "../commands/output-cli-command";
import { BaseCommand } from "../commands/base-command";
import { AddCommand } from "../commands/add-command";
import { ReplaceCommand } from "../commands/replace-command";
import { RemoveCommand } from "../commands/remove-command";
import { UpdateTypeCommand } from "../commands/update-type-command";
import { UpdateTaskCommand } from "../commands/update-task-command";
import { ChainHandler } from "./chain-handler";

export class CommandHandler {

    private inputResults : any;
    private commandResults : any;

    private getInstance(cmd: string) : BaseCommand {
        switch (cmd) {
            case "add":
                return new AddCommand();
            case "append":
                return new AppendCommand();
            case "replace":
                return new ReplaceCommand();
            case "remove":
                return new RemoveCommand();
            case "update": 
                return new UpdateTypeCommand();
            case "check":
                return new UpdateTaskCommand(true);
            case "uncheck":
                return new UpdateTaskCommand(false);
            case "toTask":
                return new UpdateTypeCommand(true);
            case "toNote":
                return new UpdateTypeCommand(false);
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
            this.inputResults = (await Promise.all(command.inputs.map((input : any) => (new input.command()).execute(input.options)))).flat();
            log("CLI Input Results:", this.inputResults);

            // Commands 
            this.commandResults = await (new command.command()).execute(this.inputResults);
            log("Command Results:", this.commandResults);
            
            // Commands Specific Outputs 
            if (command.chains) { 
                this.commandResults = (await Promise.all(command.chains.map((output : any) => (new output.command()).execute(this.commandResults)))).flat();
            }
            
            // Output
            await Promise.all(this.getCommands(defaultOutput).map(output => (new output.command()).execute(this.commandResults)));

            // // Chained commands    
            const chain = [].concat(cli.flags.chain);
            chain.filter( chainCommand => chainCommand !== undefined )
                .map(chainCommand => this.getInstance(chainCommand))
                .map( async chainCommand => new CliOutputCommand().execute(await chainCommand.execute(this.commandResults)));
        }
    }

    async handleAsChain() {
        const Commands = this.getCommands(commands);
        let chainRef = new BaseCommand();
        let Options = {}

        let lastRef = Commands.reduce((lastRef, command, index)=> {
            if (index === 0) {
                chainRef = lastRef = new command.inputs[0].command();
                Options = command.inputs[0].options;
            }

            const Command : BaseCommand = new command.command();
            lastRef = lastRef.setNext(Command);

            if (command.chains) { 
                const Chain = new command.chains[0].command();
                lastRef = lastRef.setNext(Chain);
            }
            return lastRef;
        }, chainRef);

        // // Default Output
        // this.getCommands(defaultOutput).reduce((lastRef, output)=>{
        //     const OutputCommand = new output.command();
        //     return lastRef.setNext(OutputCommand);
        // },lastRef);

        this.commandResults = await chainRef.handle(Options);

        // Chained commands    
        const ref =  new BaseCommand();
        const chain : string[] = [].concat(cli.flags.chain);
        const ChainCommands : any[] = chain
            .filter( chainCommand => chainCommand !== undefined )
            .map(chainCommand => this.getInstance(chainCommand));

        lastRef = ChainCommands.reduce((lastRef, cmd) => {
            return lastRef.setNext(cmd)
        }, ref);

        console.log(this.commandResults);
        this.commandResults = await ref.handle(this.commandResults);
        console.log(this.commandResults);
        
        // Default Output
        this.getCommands(defaultOutput).reduce((lastRef, output)=>{
            const OutputCommand = new output.command();
            return lastRef.setNext(OutputCommand);
        },lastRef);

    }
}


