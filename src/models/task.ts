import { Note } from "./note";

export class Task extends Note {

	public completed: boolean = false;

	constructor(content : string) {
		super(content);
		this.type = "task";
	}

	override getJSON(): { id: number; type:string, content: string; created: number; } {
		return Object.assign(super.getJSON(), {
			completed: this.completed
		});
	}

	override formatedJSON() : any {
		return Object.assign(super.formatedJSON(), {
			completed: this.completed
		})
	}

	setCompleted(value : boolean) {
		value = value || false;
		this.completed = !!value;
		return this;
	}
}