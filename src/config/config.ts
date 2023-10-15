import { CliOutputCommand } from "../commands/output-cli-command";
import { ClipboardInputCommand } from "../commands/input-clipboard-command";
import { AddCommand } from "../commands/add-command";
import { AppendCommand } from "../commands/append-command";
import { CliInputCommand } from "../commands/input-cli-command";
import { SelectByIdCommand } from "../commands/select-by-id-command";
import { ReplaceCommand } from "../commands/replace-command";
import { RemoveCommand } from "../commands/remove-command";
import { SearchCommand } from "../commands/search-command";
import { ClipboardOutputCommand } from "../commands/output-clipboard-command";
import { UpdateTaskCommand } from "../commands/update-task-command";
import { UpdateTypeCommand } from "../commands/update-type-command";
import { FileOutputCommand } from "../commands/output-file-command";

interface templateJSON {
    id: number,
    data: { [key:string] : any }
}

const template : templateJSON = {
    id: 1,
    data: {}
}

const commands = [
    {
        command:    AddCommand,
        flags: 		{ add: true, clip: false },
        inputs: 	[{ 
                        command: CliInputCommand, 
                        options: {
                            label: "add: ",
                            index: 0,
                            isNew: true
                        }
                    }],
        chains: []
    },

    {
        command:    AddCommand,
        flags: 		{ add: true, clip: true },
        inputs: 	[{ command: ClipboardInputCommand }],
        chains:    [{ command: AppendCommand }]
    },

    {
        command:    SelectByIdCommand,
        flags:      { append: true },
        inputs:     [{ 
                        command: CliInputCommand,
                        options: {
                            label: "id: ",
                            index: 0,
                            isNew: false
                        }
                    }],
        chains:    [{ command: AppendCommand }]
    },

    {
        command:    SelectByIdCommand,
        flags:      { replace: true },
        inputs:     [{ 
                        command: CliInputCommand,
                        options: {
                            label: "id: ",
                            index: 0,
                            isNew: false
                        }
                    }],
        chains:    [{ command: ReplaceCommand }]
    }, 

    {
        command: SelectByIdCommand,
        flags: { selectId: true },
        inputs:     [{ 
            command: CliInputCommand,
            options: {
                label: "id: ",
                index: 0,
                isNew: false
            }
        }]
    },

    {
        command: SelectByIdCommand,
        flags: { remove: true },
        inputs:     [{ 
            command: CliInputCommand,
            options: {
                label: "id: ",
                index: 0,
                isNew: false
            }
        }],
        chains: [{ command: RemoveCommand }]
    },

    {
        command: SearchCommand,
        flags: { search: true },
        inputs: [{
            command: CliInputCommand,
            options: {
                label: "search: ",
                index: 0,
                isNew: false
            }
        }]
    },

    {
        command:    SelectByIdCommand,
        flags:      { check: true },
        inputs:     [{ 
                        command: CliInputCommand,
                        options: {
                            label: "id: ",
                            index: 0,
                            isNew: false
                        }
                    }],
        chains:    [{ command: UpdateTaskCommand }]
    },

    {
        command:    SelectByIdCommand,
        flags:      { uncheck: true },
        inputs:     [{ 
                        command: CliInputCommand,
                        options: {
                            label: "id: ",
                            index: 0,
                            isNew: false
                        }
                    }],
        chains:    [{ command: UpdateTaskCommand }]
    },

    {
        command:    SelectByIdCommand,
        flags:      { update: true },
        inputs:     [{ 
                        command: CliInputCommand,
                        options: {
                            label: "id: ",
                            index: 0,
                            isNew: false
                        }
                    }],
        chains:    [{ command: UpdateTypeCommand }]
    }
]

const defaultOutput = [

    {
        command:    CliOutputCommand,
        flags:      { console: true }
    },

    {
        command:    ClipboardOutputCommand,
        flags:      { clipboard: true }
    },

    {
        command:    FileOutputCommand,
        flags:      { output: true }
    },

];

export { 
    template,
    commands,
    defaultOutput,
}