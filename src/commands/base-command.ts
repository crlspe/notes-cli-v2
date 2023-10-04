import { NoteHandler } from "../handlers/note-handler";
import { FileStorage } from "../storage/file-storage";
import { log } from "../utils/log";

export class BaseCommand {
    protected _noteHandler : NoteHandler;
    protected _results : Array<any>;

    constructor() {
        this._noteHandler = new NoteHandler(new FileStorage());
        this._results = [];
    }

    async execute(input : any) {
        log(`Input > ${this.constructor.name}`, input);
        return this._results;
    }
}