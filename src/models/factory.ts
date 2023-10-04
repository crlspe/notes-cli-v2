import { Note } from "./note";
import { Task } from "./task";
import { cli } from "../utils/cli";

export class Factory {

	static fromJSON(json : {[key : string] : any}) {
		switch (json.type) {
			case 'task':
				let task = new Task(json.content);
				task.completed = !!json.completed;
				task.created = json.created;
				task.id = +json.id;
				return task;
			default:
				let note = new Note(json.content);
				note.created = json.created;
				note.id = +json.id;
				return note;
		}
	}

	static newFromCLI(content : string) {
		if (cli.flags.task) return new Task(content);
		return new Note(content);
	}

	static newFromType(type : string, content : string) {
		if (type == 'task') return new Task(content);
		return new Note(content);
	}
}