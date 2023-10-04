"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const note_1 = require("./note");
const task_1 = require("./task");
const cli_1 = require("../utils/cli");
class Factory {
    static fromJSON(json) {
        switch (json.type) {
            case 'task':
                let task = new task_1.Task(json.content);
                task.completed = !!json.completed;
                task.created = json.created;
                task.id = +json.id;
                return task;
            default:
                let note = new note_1.Note(json.content);
                note.created = json.created;
                note.id = +json.id;
                return note;
        }
    }
    static newFromCLI(content) {
        if (cli_1.cli.flags.task)
            return new task_1.Task(content);
        return new note_1.Note(content);
    }
    static newFromType(type, content) {
        if (type == 'task')
            return new task_1.Task(content);
        return new note_1.Note(content);
    }
}
exports.Factory = Factory;
