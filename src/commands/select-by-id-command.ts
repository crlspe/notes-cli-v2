import { BaseCommand } from "./base-command";

export class SelectByIdCommand extends BaseCommand { 

    async execute(ids: any): Promise<any[]> {
        
        this._results = this._noteHandler.searchById(...ids);

        return await super.execute(ids);
    }
}