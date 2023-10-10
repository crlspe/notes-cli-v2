"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const log_1 = require("../utils/log");
const cli_1 = require("../utils/cli");
const config_1 = require("../config/config");
const append_command_1 = require("../commands/append-command");
const output_cli_command_1 = require("../commands/output-cli-command");
const base_command_1 = require("../commands/base-command");
const add_command_1 = require("../commands/add-command");
const replace_command_1 = require("../commands/replace-command");
const remove_command_1 = require("../commands/remove-command");
const update_type_command_1 = require("../commands/update-type-command");
const update_task_command_1 = require("../commands/update-task-command");
class CommandHandler {
    getInstance(cmd) {
        switch (cmd) {
            case "add":
                return new add_command_1.AddCommand();
            case "append":
                return new append_command_1.AppendCommand();
            case "replace":
                return new replace_command_1.ReplaceCommand();
            case "remove":
                return new remove_command_1.RemoveCommand();
            case "update":
                return new update_type_command_1.UpdateTypeCommand();
            case "check":
                return new update_task_command_1.UpdateTaskCommand(true);
            case "uncheck":
                return new update_task_command_1.UpdateTaskCommand(false);
            case "toTask":
                return new update_type_command_1.UpdateTypeCommand(false);
            case "toNote":
                return new update_type_command_1.UpdateTypeCommand(true);
            default:
                return new base_command_1.BaseCommand();
        }
    }
    getCommands(commandList) {
        const noteCommands = commandList.filter(command => {
            const commandFlags = command.flags;
            return Object.keys(command.flags).every(key => cli_1.cli.flags[key] === commandFlags[key]);
        });
        (0, log_1.log)("Note Commands Selected:", noteCommands);
        return noteCommands;
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const command of this.getCommands(config_1.commands)) {
                // Inputs
                this.inputResults = (yield Promise.all(command.inputs.map((input) => (new input.command()).execute(input.options)))).flat();
                (0, log_1.log)("CLI Input Results:", this.inputResults);
                // Commands 
                this.commandResults = yield (new command.command()).execute(this.inputResults);
                (0, log_1.log)("Command Results:", this.commandResults);
                // Commands Specific Outputs 
                if (command.chains) {
                    this.commandResults = (yield Promise.all(command.chains.map((output) => (new output.command()).execute(this.commandResults)))).flat();
                }
                // Output
                yield Promise.all(this.getCommands(config_1.defaultOutput).map(output => (new output.command()).execute(this.commandResults)));
                // // Chained commands    
                const chain = [].concat(cli_1.cli.flags.chain);
                chain.filter(chainCommand => chainCommand !== undefined)
                    .map(chainCommand => this.getInstance(chainCommand))
                    .map((chainCommand) => __awaiter(this, void 0, void 0, function* () { return new output_cli_command_1.CliOutputCommand().execute(yield chainCommand.execute(this.commandResults)); }));
            }
        });
    }
    handleAsChain() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const command of this.getCommands(config_1.commands)) {
                // Inputs
                this.inputResults = (yield Promise.all(command.inputs.map((input) => (new input.command()).execute(input.options)))).flat();
                (0, log_1.log)("CLI Input Results:", this.inputResults);
                // Commands 
                this.commandResults = yield (new command.command()).execute(this.inputResults);
                (0, log_1.log)("Command Results:", this.commandResults);
                // Commands Specific Outputs 
                if (command.chains) {
                    this.commandResults = (yield Promise.all(command.chains.map((output) => (new output.command()).execute(this.commandResults)))).flat();
                }
                // Output
                yield Promise.all(this.getCommands(config_1.defaultOutput).map(output => (new output.command()).execute(this.commandResults)));
                // // Chained commands    
                const chain = [].concat(cli_1.cli.flags.chain);
                chain.filter(chainCommand => chainCommand !== undefined)
                    .map(chainCommand => this.getInstance(chainCommand))
                    .map((chainCommand) => __awaiter(this, void 0, void 0, function* () { return new output_cli_command_1.CliOutputCommand().execute(yield chainCommand.execute(this.commandResults)); }));
            }
        });
    }
}
exports.CommandHandler = CommandHandler;
