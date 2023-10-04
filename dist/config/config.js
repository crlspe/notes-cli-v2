"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOutput = exports.commands = exports.template = void 0;
const output_cli_command_1 = require("../commands/output-cli-command");
const input_clipboard_command_1 = require("../commands/input-clipboard-command");
const add_command_1 = require("../commands/add-command");
const append_command_1 = require("../commands/append-command");
const input_cli_command_1 = require("../commands/input-cli-command");
const select_by_id_command_1 = require("../commands/select-by-id-command");
const replace_command_1 = require("../commands/replace-command");
const remove_command_1 = require("../commands/remove-command");
const search_command_1 = require("../commands/search-command");
const output_clipboard_command_1 = require("../commands/output-clipboard-command");
const update_task_command_1 = require("../commands/update-task-command");
const update_type_command_1 = require("../commands/update-type-command");
const output_file_command_1 = require("../commands/output-file-command");
const template = {
    id: 1,
    data: {}
};
exports.template = template;
const commands = [
    {
        command: add_command_1.AddCommand,
        flags: { add: true, clip: false },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "add: ",
                    index: 0,
                    isNew: true
                }
            }]
    },
    {
        command: add_command_1.AddCommand,
        flags: { add: true, clip: true },
        inputs: [{ command: input_clipboard_command_1.ClipboardInputCommand }],
        chains: [{ command: append_command_1.AppendCommand }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { append: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: append_command_1.AppendCommand }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { replace: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: replace_command_1.ReplaceCommand }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { selectId: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { remove: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: remove_command_1.RemoveCommand }]
    },
    {
        command: search_command_1.SearchCommand,
        flags: { search: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "search: ",
                    index: 0,
                    isNew: false
                }
            }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { check: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: update_task_command_1.UpdateTaskCommand }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { uncheck: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: update_task_command_1.UpdateTaskCommand }]
    },
    {
        command: select_by_id_command_1.SelectByIdCommand,
        flags: { update: true },
        inputs: [{
                command: input_cli_command_1.CliInputCommand,
                options: {
                    label: "id: ",
                    index: 0,
                    isNew: false
                }
            }],
        chains: [{ command: update_type_command_1.UpdateTypeCommand }]
    }
];
exports.commands = commands;
const defaultOutput = [
    {
        command: output_cli_command_1.CliOutputCommand,
        flags: { console: true }
    },
    {
        command: output_clipboard_command_1.ClipboardOutputCommand,
        flags: { clipboard: true }
    },
    {
        command: output_file_command_1.FileOutputCommand,
        flags: { output: true }
    },
];
exports.defaultOutput = defaultOutput;
