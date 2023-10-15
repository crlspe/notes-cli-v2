import { ChainHandler } from "../handlers/chain-handler";
import { NoteHandler } from "../handlers/note-handler";
import { Note } from "../models/note";
import { Task } from "../models/task";
import { FileStorage } from "../storage/file-storage";
import { log } from "../utils/log";

export class BaseCommand extends ChainHandler {
    protected _noteHandler : NoteHandler;
    protected _results : Array<any>;

    constructor() {
        super();
        this._noteHandler = new NoteHandler(new FileStorage());
        this._results = [];
    }

    async handle(input: any): Promise<(Note|Task)[]> {
        await this.execute(input);
        return await super.handle(this._results);
    }

    async execute(input : any) {
        log(`Input > ${this.constructor.name}`, input);
        return this._results;
    }
}