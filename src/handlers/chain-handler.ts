import { BaseCommand } from "../commands/base-command";
import { Note } from "../models/note";
import { Task } from "../models/task";

class HandlerNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HandlerNotFoundError";
    }
}

export abstract class BaseCommandHandler {
    protected _next: BaseCommandHandler | null = null;

    async handle(command: BaseCommand, input : any): Promise<(Note | Task)[]> {
        if (this._next) {
            return await this._next.handle(command,input);
        } else {
            throw new HandlerNotFoundError("Handler Not Found");
        }
    }

    setNext(commandHandler: BaseCommandHandler): BaseCommandHandler {
        this._next = commandHandler;
        return this;
    }
}