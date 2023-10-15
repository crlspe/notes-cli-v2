import { Note } from "../models/note";
import { Task } from "../models/task";

class HandlerNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HandlerNotFoundError";
    }
}

export abstract class ChainHandler {
    private _next: ChainHandler | null = null;

    async handle(input : any): Promise<(Note|Task)[]> {
        if (this._next) {
            return await this._next.handle(input);
        } 
        return input;
    }

    setNext(commandHandler: ChainHandler): ChainHandler {
        this._next = commandHandler;
        return this._next;
    }
}