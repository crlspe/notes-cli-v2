"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const note_1 = require("./note");
class Task extends note_1.Note {
    constructor(content) {
        super(content);
        this.completed = false;
        this.type = "task";
    }
    getJSON() {
        return Object.assign(super.getJSON(), {
            completed: this.completed
        });
    }
    formatedJSON() {
        return Object.assign(super.formatedJSON(), {
            completed: this.completed
        });
    }
    setCompleted(value) {
        value = value || false;
        this.completed = !!value;
        return this;
    }
}
exports.Task = Task;
